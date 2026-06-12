# CSP Research Engine

A security-focused research tool for analyzing Content Security Policy (CSP) configurations and identifying potentially risky patterns, misconfigurations, and known third-party script sources.

---

## Overview

Content Security Policy (CSP) is one of the most important browser security mechanisms for mitigating Cross-Site Scripting (XSS).

However, many CSP deployments contain overly permissive rules, risky third-party domains, wildcard sources, or unsafe directives that weaken their protection.

CSP Research Engine helps security researchers understand and analyze CSP configurations through automated parsing and risk assessment.

---

## Features

- CSP header analysis
- Directive extraction
- Risk scoring
- Domain identification
- Third-party source discovery
- Searchable gadget database
- Fast client-side filtering
- Secure rendering of research data

---

## Planned Features

- Advanced CSP parser
- Risk classification engine
- Domain reputation scoring
- Export reports
- Dark mode
- Search history
- CSP comparison mode

---

## 🚀 How to Run

This project is a pure frontend JavaScript application (no backend required).

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/CSPResearchEngine.git
cd CSPResearchEngine
```
### 2. Start a local server
Because ES Modules are used, you must run it on a local server. 
**Option A (VS Code)** 
Install Live Server extension and click: 
```bash
Go Live
```
**Option C (Node.js)**
```bash
npx serve .
```
### 3. Open in browser
Navigate to:
```
http://localhost:8000
```

## Project Structure

```text
CSP-Research-Engine
│
├── index.html
├── styles.css
├── app.js
│
├── data/
├── core/
├── utils/
│
└── README.md
```

## Security Notice

This project is intended for educational purposes and authorized security research only.

Users are responsible for complying with all applicable laws and obtaining proper authorization before testing any systems.

---

## License

MIT License
