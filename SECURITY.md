# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in VenueFlow, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email the maintainer directly with:
- A description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Any suggested mitigations

### What to Expect
- Acknowledgement within 48 hours
- Regular updates on remediation progress
- Credit in the changelog upon fix (if desired)

## Security Measures in This Project

- **Input Sanitization**: All user inputs are sanitized using regex-based HTML/XSS stripping before processing
- **Input Length Limiting**: User inputs are capped at 500 characters to prevent denial-of-service via input
- **No Raw HTML Rendering**: React's JSX prevents raw HTML injection by default (`dangerouslySetInnerHTML` is not used)
- **Google API Keys**: API keys are managed via environment variables (`.env`) and never committed to the repository
- **Content Security Policy**: The app uses strict iframe sandboxing for Google Maps embeds
- **Dependency Auditing**: Run `npm audit` regularly to check for known vulnerabilities in dependencies
