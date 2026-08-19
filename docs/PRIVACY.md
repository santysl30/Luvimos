# Luvimos — Privacy Baseline

## Purpose

Luvimos handles potentially sensitive conversational and emotional information. Privacy is a core product requirement, not an afterthought.

## Data Minimization

Collect and retain only information required for a clearly defined feature or safety purpose.

## Data Categories

Potential categories include:

- account/identity data
- profile and age-band data
- conversation content
- derived emotion data
- VAD data
- mood entries
- behavioral signals
- risk events
- Care Circle relationships
- consent records
- integration metadata
- audit/security events

Derived AI information must be clearly distinguished from information explicitly provided by the user.

## Consent

Consent must be purpose-specific where required and revocable where applicable. Track:

- purpose
- scope
- actor
- timestamp
- policy/version
- status
- revocation

## Minors

The product must use age-appropriate experiences and guardian/legal-guardian controls. The exact legal and regulatory requirements must be validated for every deployment jurisdiction before real minor data is processed.

Do not assume a parent has unrestricted access to every child conversation.

## Adults

Adults are independent users by default. A Care Circle is opt-in/authorized and permission-controlled.

## Data Access

Use least privilege. Access to sensitive information should be restricted by resource-level authorization.

## Data Retention

Retention periods must be defined per data category and purpose. Avoid indefinite storage by default.

## User Controls

The product should support appropriate mechanisms for:

- viewing stored information
- correction
- export
- deletion
- consent withdrawal
- relationship/permission management
- integration disconnection

## AI Processing

Only necessary context should be sent to external model providers. Provider policies, retention behavior, regional requirements, and contractual/privacy requirements must be evaluated before production use.

## External Integrations

Only information available through authorized official APIs/mechanisms may be processed. No covert monitoring or unauthorized private-message access is permitted.

## Research

Research use of user data requires a separately defined consent and governance process. Development and evaluation should prefer synthetic, anonymized, or appropriately approved datasets.

## Production Gate

Before real sensitive data is processed, complete a privacy impact assessment appropriate to the deployment, review applicable law/policy, document retention, access, deletion, incident handling, and third-party processing.
