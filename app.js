import { parseCSP } from "./core/parser.js";
import { generateCSPReport } from "./core/report.js";

const textarea = document.getElementById("search");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const sourcesEl = document.getElementById("sources");

const findingsEl = document.getElementById("findings");
const matchesEl = document.getElementById("matches");

let gadgets = [];

/**
 * Load gadget database
 */
fetch("./data/gadgets.json")
    .then(response => response.json())
    .then(json => {
        gadgets = json;
    })
    .catch(error => {
        console.error("Failed to load gadgets:", error);
    });

/**
 * Render full CSP report in UI
 */
function renderReport(report) {

    // Risk score
    scoreEl.textContent = `${report.score}/100`;

    // Risk level
    levelEl.textContent = report.level;

    // Exposed sources summary
    sourcesEl.textContent = report.summary.exposedSources;

    // Findings list
    findingsEl.innerHTML = report.findings.length
        ? report.findings.map(f => `
            <li>
                <strong>${f.severity}</strong> — ${f.directive}<br>
                ${f.issue}
            </li>
        `).join("")
        : "<li>No issues found</li>";

    // Matches list
    matchesEl.innerHTML = report.matches.length
        ? report.matches.map(m => `
            <li>
                <strong>${m.domain}</strong><br>
                <code>${m.payload}</code>
            </li>
        `).join("")
        : "<li>No matches found</li>";
}

/**
 * Live CSP analysis handler
 */
function analyzeInput(value) {

    const trimmed = value.trim();

    if (!trimmed) {

        // reset UI
        scoreEl.textContent = "0";
        levelEl.textContent = "-";
        sourcesEl.textContent = "0";
        findingsEl.innerHTML = "";
        matchesEl.innerHTML = "";

        return;
    }

    // 1. Parse CSP
    const parsedPolicy = parseCSP(trimmed);

    // 2. Generate full report
    const report = generateCSPReport(parsedPolicy, gadgets);

    // 3. Render UI
    renderReport(report);
}

/**
 * Input event (live analysis)
 */
textarea.addEventListener("input", (event) => {
    analyzeInput(event.target.value);
});
