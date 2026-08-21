# Luvimos Threat Model

## Security objective

Protect identity, conversations, emotional inferences, VAD measurements, risk events, consent records, guardian relationships, sessions, and integration credentials from unauthorized access or manipulation.

## Primary threats

| Threat | Control |
|---|---|
| Credential theft | Argon2id, secure cookies, session rotation |
| Session theft | HttpOnly/Secure/SameSite cookies, hashed server-side tokens |
| IDOR / broken authorization | Resource ownership checks on every sensitive request |
| Brute force | Rate limits, account recovery protections |
| XSS | Output encoding, CSP, safe rendering |
| CSRF | SameSite cookies plus explicit CSRF protection where required |
| Prompt injection | Untrusted-content boundaries, policy checks, tool isolation |
| AI data exfiltration | Context minimization, output validation, no secret exposure |
| Database compromise | Least privilege, encryption of sensitive fields, secret management |
| Secret leakage | Environment secrets, scanning, redacted logs |
| Supply-chain compromise | Dependency auditing and CodeQL |
| DoS | Payload limits, rate limits, upstream protections |

## Trust boundaries

1. Browser to public API.
2. Public API to authenticated application services.
3. Application services to database.
4. Application services to internal AI service.
5. AI model to safety/policy enforcement.

The model is never itself a security boundary.

## High-risk rule

No LLM response may directly authorize disclosure of private data, account changes, guardian access, external network actions, or other privileged operations. Deterministic application policy must authorize those operations.

## Production gate

Before real sensitive-user data is introduced, complete dependency review, authorization tests, secret review, privacy review, threat-model review, penetration testing, backup/restore testing, and incident-response procedures.
