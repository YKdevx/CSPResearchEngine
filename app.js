import { parseCSP } from "./core/parser.js";

const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

let gadgets = [];

fetch("./data/gadgets.json")
    .then(res => res.json())
    .then(json => {
        gadgets = json;
    })
    .catch(error => {
        console.error("Failed to load gadgets:", error);
    });

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

searchInput.addEventListener("input", (event) => {
    search(event.target.value);
});

const testPolicy = `
default-src 'self';
script-src 'self' https://google.com https://youtube.com;
img-src *;
`;

console.log(parseCSP(testPolicy));
