export function parseCSP(cspHeader) {

    if (!cspHeader || typeof cspHeader !== "string") {
        return {};
    }

    const result = {};

    const directives = cspHeader
        .split(";")
        .map(item => item.trim())
        .filter(Boolean);

    directives.forEach(directive => {

        const parts = directive.split(/\s+/);

        const directiveName = parts[0];

        const values = parts.slice(1);

        result[directiveName] = values;
    });

    return result;
}
