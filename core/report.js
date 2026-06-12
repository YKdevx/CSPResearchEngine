import { analyzeCSP } from "./cspAnalyzer.js";
import { findMatchingGadgets } from "./search.js";

/**
 * Generate full CSP security report
 */
export function generateCSPReport(parsedPolicy, gadgets) {

    // 1. Analyze risk
    const analysis = analyzeCSP(parsedPolicy);

    // 2. Find matches
    const matches = findMatchingGadgets(parsedPolicy, gadgets);

    // 3. Count risky directives
    const riskyDirectives = new Set(
        analysis.findings.map(f => f.directive)
    );

    // 4. Extract unique exposed sources
    const exposedSources = new Set(
        matches.map(m => m.domain)
    );

    return {
        score: analysis.score,
        level: analysis.level,
        findings: analysis.findings,
        matches: matches,
        summary: {
            riskyDirectives: riskyDirectives.size,
            exposedSources: exposedSources.size
        }
    };
}
