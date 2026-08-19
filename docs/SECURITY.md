# Luvimos — Security Baseline

## Principles

- Least privilege
- Defense in depth
- Secure by default
- Privacy by design
- Explicit authorization
- No secret commits
- No covert monitoring
- Fail safely

## Sensitive Data

Treat the following as sensitive:

- authentication credentials
- identity information
- conversations
- emotional/inferred attributes
- VAD measurements
- risk events
- guardian relationships
- consent records
- integration tokens

Do not use real sensitive user data in development unless a documented, approved process exists.

## Authentication

- Strong password hashing when passwords are supported
- Secure sessions/tokens
- Credential rotation
- Rate limiting
- Account recovery protections

## Authorization

Every sensitive endpoint must perform server-side authorization using user identity, role, relationship, permission, resource, consent, and applicable policy.

## Secrets

Never commit:

- `.env`
- API keys
- access tokens
- database passwords
- private certificates
- signing keys

Use environment/secret management instead.

## AI Security

- Validate model inputs
- Treat external content as untrusted
- Defend against prompt injection
- Never expose system prompts or secrets through model output
- Validate structured model output
- Do not allow LLM output to directly perform privileged actions without policy checks

## Safety Security

Safety actions must pass through deterministic authorization and policy controls. LLM output alone must never trigger privileged disclosure or external actions.

## External Integrations

Only official/authorized APIs and scopes are permitted. Never bypass platform security, encryption, authentication, or access controls.

## Logging

Do not log full private conversations or secrets by default. Use structured, minimal, redacted logs.

## Incident Response

The project should eventually define procedures for:

- credential compromise
- unauthorized access
- data leakage
- AI safety failure
- integration compromise
- notification failure

## Security Review Gate

Before production or real sensitive-user testing, complete a threat model, dependency review, authorization review, secrets review, privacy review, and security test suite.
