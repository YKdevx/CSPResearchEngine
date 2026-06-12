function normalizeDomain(input) {

    return input
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split("/")[0]
        .trim();
}

/**
 * Check wildcard match (*.example.com)
 */
function matchesWildcard(source, domain) {

    if (source.startsWith("*.")) {

        const base = source.replace("*.", "");

        return domain === base || domain.endsWith("." + base);
    }

    return domain.includes(source) || source.includes(domain);
}

/**
 * Extract valid domains from CSP
 */
function extractSources(parsedPolicy) {

    const sources = [];

    for (const values of Object.values(parsedPolicy)) {

        values.forEach(value => {

            const v = value.trim();

            // ignore keywords
            if (
                v.startsWith("'") ||
                v === "*" ||
                v === "self"
            ) {
                sources.push(v);
                return;
            }

            // keep only domain-like values
            if (v.includes(".")) {
                sources.push(normalizeDomain(v));
            }
        });
    }

    return [...new Set(sources)];
}

/**
 * Main matching engine
 */
export function findMatchingGadgets(parsedPolicy, gadgets) {

    const sources = extractSources(parsedPolicy);

    const matches = [];
    const seen = new Set();

    sources.forEach(source => {

        gadgets.forEach(gadget => {

            const gadgetDomain = normalizeDomain(gadget.domain);

            const match =
                source === "*" ||
                matchesWildcard(source, gadgetDomain) ||
                matchesWildcard(gadgetDomain, source);

            if (match && !seen.has(gadgetDomain)) {

                seen.add(gadgetDomain);

                matches.push(gadget);
            }
        });
    });

    return matches;
}
