const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

let data = [];

// load data
fetch("./data/gadgets.json")
    .then(res => res.json())
    .then(json => {
        data = json;
    });

function search(query) {
    const q = query.toLowerCase();

    const results = data.filter(item =>
        item.domain.toLowerCase().includes(q) ||
        item.payload.toLowerCase().includes(q)
    );

    render(results);
}

function render(results) {
    resultsList.innerHTML = results.length
        ? results.map(r => `
            <li>
                <strong>${r.domain}</strong><br/>
                <code>${r.payload}</code>
            </li>
        `).join("")
        : "<li>No results found</li>";
}

searchInput.addEventListener("input", (e) => {
    search(e.target.value);
});
