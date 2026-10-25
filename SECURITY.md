# Security Policy

This static website employs strict security headers to mitigate common web vulnerabilities:
- **Content Security Policy (CSP):** Restricts resources to self-hosted assets only, preventing XSS and data injection.
- **X-Frame-Options:** Set to DENY to prevent clickjacking.
- **HSTS:** Requires a valid SSL certificate (handled automatically by Netlify).

**Limitations:**
As a static website, there is no server-side logic or database to compromise. However, sensitive documents (ID, payslips) are still handled externally via WhatsApp. Never upload sensitive documents to unverified forms.