export function analyzeCSP(parsedPolicy) {

    const findings = [];
    let score = 0;

    for (const [directive, values] of Object.entries(parsedPolicy)) {

        if (values.includes("*")) {

            findings.push({
                severity: "HIGH",
                directive,
                issue: "Wildcard source (*) detected"
            });

            score += 30;
        }

        if (values.includes("'unsafe-inline'")) {

            findings.push({
                severity: "HIGH",
                directive,
                issue: "unsafe-inline detected"
            });

            score += 25;
        }

        if (values.includes("'unsafe-eval'")) {

            findings.push({
                severity: "CRITICAL",
                directive,
                issue: "unsafe-eval detected"
            });

            score += 40;
        }

        if (values.includes("data:")) {

            findings.push({
                severity: "MEDIUM",
                directive,
                issue: "data: URI allowed"
            });

            score += 15;
        }

        if (values.includes("blob:")) {

            findings.push({
                severity: "MEDIUM",
                directive,
                issue: "blob: URI allowed"
            });

            score += 10;
        }
    }

    score = Math.min(score, 100);

    let level = "LOW";

    if (score >= 75) {
        level = "CRITICAL";
    } else if (score >= 50) {
        level = "HIGH";
    } else if (score >= 25) {
        level = "MEDIUM";
    }

    return {
        score,
        level,
        findings
    };
}
