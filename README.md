## 🔐 CSP Research Engine

A real-time Content Security Policy (CSP) analysis tool that parses CSP headers, evaluates security risks, and maps configurations to known vulnerable gadget patterns.

### 🎯 Key Features

- Real-time CSP parsing
- Security risk scoring (0–100)
- Detection of unsafe directives (`unsafe-inline`, `unsafe-eval`)
- Wildcard and domain-based source analysis
- Gadget matching engine for known bypass patterns
- Exportable security reports (JSON)
- Fully frontend-based (no backend required)

### 🧠 What this project demonstrates

- Web security fundamentals (CSP, XSS mitigation)
- JavaScript modular architecture
- Data analysis & rule-based engines
- Frontend state management
- Security-focused thinking (Bug Bounty mindset)
---

## 🛠 Tech Stack

- JavaScript (ES Modules)
- HTML5
- CSS3
- Fetch API
- Blob API (Export system)

---

## 🏗 Architecture
```text
CSP Input
↓
Parser (cspParser.js)
↓
Analyzer (cspAnalyzer.js)
↓
Report Engine (report.js)
↓
UI Dashboard (app.js)
↓
Export System (JSON)
```
---

## 🎯 Use Cases

- Security researchers analyzing CSP misconfigurations
- Bug bounty hunters testing XSS bypass surfaces
- Learning CSP behavior in modern browsers
- Demonstrating frontend security tooling skills

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

---

## Security Notice

This project is intended for educational purposes and authorized security research only.

Users are responsible for complying with all applicable laws and obtaining proper authorization before testing any systems.

---

## License

MIT License
