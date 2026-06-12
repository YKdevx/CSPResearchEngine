import { parseCSP } from "./core/parser.js";
import { analyzeCSP } from "./core/cspAnalyzer.js";

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
 * Temporary CSP parser/analyzer test
 * (Will be replaced by real UI integration later)
 */
const testPolicy = `
default-src 'self';
script-src 'self' https://google.com https://youtube.com *;
img-src data:;
`;

const parsedPolicy = parseCSP(testPolicy);

console.log("Parsed CSP:");
console.log(parsedPolicy);

console.log("Analysis Results:");
console.table(analyzeCSP(parsedPolicy));
