export function analyzeCSP(parsedPolicy) {

    const findings = [];
    let score = 0;

    const addFinding = (severity, directive, issue, weight) => {
        findings.push({ severity, directive, issue });
        score += weight;
    };

    for (const [directive, values] of Object.entries(parsedPolicy)) {

        const normalized = values.map(v => v.trim().toLowerCase());

        // wildcard
        if (normalized.includes("*")) {
            addFinding(
                "HIGH",
                directive,
                "Wildcard source (*) detected",
                30
            );
        }

        // unsafe-inline
        if (normalized.includes("'unsafe-inline'")) {
            addFinding(
                "HIGH",
                directive,
                "unsafe-inline detected",
                25
            );
        }

        // unsafe-eval
        if (normalized.includes("'unsafe-eval'")) {
            addFinding(
                "CRITICAL",
                directive,
                "unsafe-eval detected",
                40
            );
        }

        // data:
        if (normalized.includes("data:")) {
            addFinding(
                "MEDIUM",
                directive,
                "data: URI allowed",
                15
            );
        }

        // blob:
        if (normalized.includes("blob:")) {
            addFinding(
                "MEDIUM",
                directive,
                "blob: URI allowed",
                10
            );
        }
    }

    score = Math.min(score, 100);

    let level = "LOW";

    if (score >= 75) level = "CRITICAL";
    else if (score >= 50) level = "HIGH";
    else if (score >= 25) level = "MEDIUM";

    return {
        score,
        level,
        findings
    };
}
