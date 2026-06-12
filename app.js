import { parseCSP } from "./core/parser.js";
import { generateCSPReport } from "./core/report.js";

const textarea = document.getElementById("search");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const sourcesEl = document.getElementById("sources");

const findingsEl = document.getElementById("findings");
const matchesEl = document.getElementById("matches");

const exportBtn = document.getElementById("exportBtn");

let gadgets = null;
let isLoaded = false;

/**
 * Load database
 */
fetch("./data/gadgets.json")
    .then(res => res.json())
    .then(json => {
        gadgets = json;
        isLoaded = true;
    })
    .catch(err => {
        console.error("Failed to load gadgets:", err);
        gadgets = [];
        isLoaded = false;
    });

/**
 * Render UI report
 */
function renderReport(report) {

    scoreEl.textContent = `${report.score}/100`;
    levelEl.textContent = report.level;
    sourcesEl.textContent = report.summary.exposedSources;

    findingsEl.innerHTML = report.findings.length
        ? report.findings.map(f => `
            <li>
                <strong>${f.severity}</strong> — ${f.directive}<br>
                ${f.issue}
            </li>
        `).join("")
        : "<li>No issues found</li>";

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
 * Live CSP analyzer
 */
function analyzeInput(value) {

    if (!isLoaded || !gadgets) return;

    const trimmed = value.trim();

    if (!trimmed) {

        scoreEl.textContent = "0/100";
        levelEl.textContent = "-";
        sourcesEl.textContent = "0";

        findingsEl.innerHTML = "<li>No analysis yet</li>";
        matchesEl.innerHTML = "<li>No matches yet</li>";

        return;
    }

    const parsed = parseCSP(trimmed);
    const report = generateCSPReport(parsed, gadgets);

    renderReport(report);
}

/**
 * Input listener (live analysis)
 */
textarea.addEventListener("input", (e) => {
    analyzeInput(e.target.value);
});

/**
 * Export CSP report
 */
exportBtn.addEventListener("click", () => {

    const value = textarea.value;
    if (!value || !value.trim()) return;
    if (!gadgets) return;

    const report = generateCSPReport(
        parseCSP(value),
        gadgets
    );

    const blob = new Blob(
        [JSON.stringify(report, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "csp-report.json";
    a.click();

    URL.revokeObjectURL(url);
});
