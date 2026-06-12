import { parseCSP } from "./core/parser.js";
import { analyzeCSP } from "./core/cspAnalyzer.js";
import { findMatchingGadgets } from "./core/search.js";

const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

let gadgets = [];

/**
 * Load gadget database
 */
fetch("./data/gadgets.json")
    .then(response => response.json())
    .then(json => {

        gadgets = json;

        // Run demo after database is loaded
        runDemo();

    })
    .catch(error => {
        console.error("Failed to load gadgets:", error);
    });

/**
 * Search gadgets by domain or payload
 */
function search(query) {

    const q = query.trim().toLowerCase();

    if (!q) {
        resultsList.innerHTML = "";
        return;
    }

    const results = gadgets.filter(item =>
        item.domain.toLowerCase().includes(q) ||
        item.payload.toLowerCase().includes(q)
    );

    render(results);
}

/**
 * Render search results
 */
function render(results) {

    resultsList.innerHTML = results.length
        ? results.map(item => `
            <li>
                <strong>${item.domain}</strong><br>
                <code>${item.payload}</code>
            </li>
        `).join("")
        : "<li>No results found</li>";
}

/**
 * Search event listener
 */
searchInput.addEventListener("input", (event) => {
    search(event.target.value);
});

/**
 * Temporary demo function
 * Tests parser, analyzer and matching engine
 */
function runDemo() {

    const testPolicy = `
        default-src 'self';
        script-src 'self' https://google.com https://youtube.com *;
        img-src data:;
    `;

    // Parse CSP
    const parsedPolicy = parseCSP(testPolicy);

    console.log("Parsed Policy:");
    console.log(parsedPolicy);

    // Analyze CSP
    const analysis = analyzeCSP(parsedPolicy);

    console.log("Risk Score:", analysis.score);
    console.log("Risk Level:", analysis.level);

    console.table(analysis.findings);

    // Search matching gadgets
    const matches = findMatchingGadgets(
        parsedPolicy,
        gadgets
    );

    console.log("Matching Gadgets:");

    console.table(matches);
}
