export function analyzeCSP(parsedPolicy) {

    const findings = [];

    for (const [directive, values] of Object.entries(parsedPolicy)) {

        if (values.includes("*")) {
            findings.push({
                severity: "HIGH",
                directive,
                issue: "Wildcard source (*) detected"
            });
        }

        if (values.includes("'unsafe-inline'")) {
            findings.push({
                severity: "HIGH",
                directive,
                issue: "unsafe-inline detected"
            });
        }

        if (values.includes("'unsafe-eval'")) {
            findings.push({
                severity: "CRITICAL",
                directive,
                issue: "unsafe-eval detected"
            });
        }

        if (values.includes("data:")) {
            findings.push({
                severity: "MEDIUM",
                directive,
                issue: "data: URI allowed"
            });
        }

        if (values.includes("blob:")) {
            findings.push({
                severity: "MEDIUM",
                directive,
                issue: "blob: URI allowed"
            });
        }
    }

    return findings;
}
