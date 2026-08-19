# Luvimos — System Architecture

**Status:** Architecture baseline  
**Version:** 0.1

## 1. Architecture Goal

Luvimos will use a modular, privacy-first architecture designed to support conversational AI, longitudinal emotional analysis, age-aware experiences, guardian/care-circle authorization, and safety workflows without turning the system into an unnecessarily complex microservice environment.

Initial architecture: **Next.js/React frontend + Node.js modular backend + Python AI service + MongoDB + provider-independent LLM adapter + event/audit layer.**

---

## 2. High-Level Architecture

```text
                         LUVIMOS CLIENTS
                 ┌──────────────┬──────────────┐
                 │              │              │
             Web App       Future Mobile    Authorized
                           Application       Integrations
                 │              │              │
                 └──────────────┼──────────────┘
                                ↓
                         API / Auth Gateway
                                │
                    ┌───────────┴───────────┐
                    │   Node.js Backend     │
                    │   Modular Monolith    │
                    └───────────┬───────────┘
                                │
       ┌────────────────────────┼─────────────────────────┐
       ↓                        ↓                         ↓
   Identity &              Conversation              Consent /
   Authorization             Service                Care Circle
       │                        │                         │
       └────────────────────────┼─────────────────────────┘
                                ↓
                         AI Orchestrator
                                │
                 ┌──────────────┼──────────────┐
                 ↓              ↓              ↓
               NLP            VAD        Risk Signals
                 │              │              │
                 └──────────────┼──────────────┘
                                ↓
                         Context / Memory
                                │
                                ↓
                         LLM Provider Layer
                                │
                                ↓
                         Response Validation
                                │
                                ↓
                       Safety Orchestrator
                         ┌──────┴──────┐
                         ↓             ↓
                     Response       Action
                         │             │
                         └──────┬──────┘
                                ↓
                         Persistence Layer
                                │
              ┌─────────────────┼─────────────────┐
              ↓                 ↓                 ↓
           MongoDB          Audit Logs        Analytics
```

---

## 3. Frontend

Recommended initial technology: **Next.js + React + TypeScript**.

Responsibilities:

- authentication UI
- onboarding
- age-aware experience
- conversational interface
- mood input
- dashboards
- VAD visualization
- longitudinal trends
- Care Circle management
- consent/privacy center
- safety notifications
- settings
- accessibility
- responsive design

The frontend must not contain privileged secrets or make direct privileged database calls.

---

## 4. Backend

Recommended technology: **Node.js + TypeScript + Express**.

The backend is a modular monolith initially. Modules:

```text
backend/
├── auth
├── users
├── relationships
├── consent
├── conversations
├── memory
├── analytics
├── safety
├── notifications
├── integrations
├── audit
└── common
```

A module should become an independent service only when scale, isolation, deployment, security, or operational requirements justify it.

---

## 5. Authentication & Authorization

Authentication establishes identity. Authorization establishes what that identity may do.

Use:

- secure password hashing where passwords are used
- short-lived access tokens/session credentials
- refresh/session rotation where applicable
- role and relationship based authorization
- resource-level authorization
- server-side permission checks
- rate limiting
- secure session handling

Never trust frontend role claims.

Conceptual roles:

- user
- parent
- legal guardian
- caregiver
- trusted contact
- administrator

A role alone is insufficient; access must also consider relationship, resource, consent, age, and policy.

---

## 6. Care Circle / Guardian Architecture

Relationships are first-class resources.

```text
User A
  │
  ├── relationship → Parent B
  ├── relationship → Caregiver C
  └── relationship → Trusted Contact D
```

Each relationship has:

- relationship type
- status
- permissions
- consent basis
- created timestamp
- updated timestamp
- expiry/review where applicable

Permission examples:

- view mood summary
- view trend
- receive safety notification
- manage selected settings
- view selected insights

Raw conversations must never become automatically visible merely because a relationship exists.

---

## 7. Conversation Pipeline

```text
Message
  ↓
Authentication + authorization
  ↓
Input validation
  ↓
Normalization / language detection
  ↓
Conversation context retrieval
  ↓
NLP analysis ──────┐
  ↓                │
Emotion analysis   │
  ↓                │
VAD                │
  ↓                │
Risk signals ──────┤
  ↓                │
Context assembly ←─┘
  ↓
LLM provider
  ↓
Output validation
  ↓
Safety policy
  ↓
Response
  ↓
Selective persistence
```

The exact pipeline may be optimized later for latency, but safety checks must not be removed simply to make the chatbot faster.

---

## 8. Python AI Service

Recommended technology: **Python**.

Responsibilities:

- NLP preprocessing
- emotion classification
- sentiment analysis
- VAD inference
- semantic analysis
- embeddings where required
- behavioral feature generation
- model evaluation
- model versioning metadata

The AI service should expose versioned internal APIs and return structured outputs.

Example conceptual response:

```json
{
  "emotion": {},
  "sentiment": {},
  "vad": {
    "valence": 0,
    "arousal": 0,
    "dominance": 0
  },
  "signals": [],
  "confidence": 0,
  "model_version": "..."
}
```

No AI output should be treated as an absolute truth.

---

## 9. LLM Provider Abstraction

Do not tightly couple the product to a single LLM provider.

```text
Luvimos AI Orchestrator
          ↓
     LLM Interface
          ↓
 ┌────────┼────────┐
 ↓        ↓        ↓
Provider A Provider B Local/Other
```

The abstraction should standardize:

- messages
- system instructions
- structured output
- tool calls
- model metadata
- token usage
- latency
- error handling
- safety configuration

Provider credentials remain server-side.

---

## 10. Context & Memory

Memory should be selective.

### Short-term
Current conversation context.

### Episodic
Relevant user-approved historical events.

### Emotional
Longitudinal emotional summaries and measurements.

### Preference
Explicit user preferences.

Do not send the entire historical database to the LLM for every request.

Retrieval should be relevance-based and permission-aware.

---

## 11. VAD Architecture

VAD is a separate analytical component.

```text
Text / conversation
        ↓
Emotion + semantic models
        ↓
VAD inference
        ↓
Validation / normalization
        ↓
VAD record
        ↓
Temporal analytics
```

Store model/version and confidence with measurements so future models can be compared without confusing outputs from different model versions.

---

## 12. Longitudinal Analytics

The analytics layer operates on time-series records rather than raw conversations whenever possible.

Capabilities:

- baseline calculation
- trend detection
- volatility
- change-point candidates
- rolling averages
- emotional distribution
- VAD trajectories
- recurring themes
- period comparison

Analytics are descriptive and probabilistic. They must not automatically become diagnoses.

---

## 13. Risk Signal Engine

Risk detection should be a layered system:

```text
Message
 ↓
Rules / deterministic signals
 ↓
NLP signals
 ↓
Model signals
 ↓
Longitudinal context
 ↓
Risk aggregation
 ↓
Structured risk state
```

The LLM may contribute contextual reasoning but must not be the only safety detector.

Risk output should include:

- level
- confidence
- signals
- timestamp
- model/rule version
- recommended next step

Avoid storing more sensitive source content than necessary.

---

## 14. Safety Orchestration

Safety orchestration is separate from conversational generation.

```text
Risk State
    ↓
Policy Engine
    ↓
User Age + Consent + Relationship + Configuration
    ↓
Allowed Actions
    ↓
Notification / Support Workflow
```

Possible actions:

- supportive response
- clarification/check-in
- suggest trusted support
- authorized Care Circle notification
- professional-support recommendation
- configured emergency workflow where legally/technically appropriate

Actions must use minimum necessary disclosure.

---

## 15. Privacy Boundary

Sensitive data should flow through explicit boundaries.

```text
Client
 ↓
Auth
 ↓
Authorized API
 ↓
Processing
 ↓
Minimal persistence
 ↓
Controlled analytics
 ↓
Permission-aware presentation
```

Privacy controls should be enforced server-side.

Every access to sensitive resources should be attributable to an authenticated actor where appropriate.

---

## 16. Database Architecture

Initial database recommendation: **MongoDB**.

Conceptual domains:

```text
users
profiles
relationships
consents
conversations
messages
memory
emotion_records
vad_records
mood_records
behavioral_signals
risk_events
safety_actions
notifications
integrations
audit_events
model_metadata
```

The exact schema will be designed separately in `docs/DATABASE.md` before implementation.

Sensitive data should be separated logically and access-controlled.

---

## 17. Event Architecture

Use domain events where asynchronous work improves reliability or responsiveness.

Examples:

```text
MESSAGE_RECEIVED
ANALYSIS_COMPLETED
VAD_COMPUTED
RISK_SIGNAL_DETECTED
SAFETY_ACTION_CREATED
CONSENT_CHANGED
CARE_CIRCLE_UPDATED
```

Initial implementation may use an internal event abstraction. A dedicated message broker should only be introduced when required.

---

## 18. External Integrations

Integrations use adapters:

```text
Platform
 ↓
Official API
 ↓
Integration Adapter
 ↓
Normalized Event
 ↓
Luvimos Processing Pipeline
```

Each adapter must enforce:

- authorization
- scopes
- rate limits
- provider policies
- data minimization
- revocation handling
- failure handling

No private-platform access should be assumed unless the official API explicitly supports it.

---

## 19. Notifications

Notification service handles:

- in-app notifications
- email where enabled
- push notifications where implemented
- authorized safety notifications

Notification payloads must minimize sensitive content, especially on lock screens or shared devices.

---

## 20. Audit & Observability

Maintain appropriate audit events for:

- authentication events
- permission changes
- consent changes
- guardian relationship changes
- sensitive data access
- safety actions
- integration changes
- administrative actions

Operational observability should track:

- latency
- error rate
- AI service failures
- LLM failures
- notification failures
- queue/event failures

Logs must avoid unnecessarily recording private conversations or secrets.

---

## 21. Deployment Architecture

Initial target:

```text
                 GitHub
                    ↓
              CI / Validation
                    ↓
       ┌────────────┴────────────┐
       ↓                         ↓
   Frontend                    Backend
   Vercel                  Suitable server
                                  │
                                  ↓
                           Python AI Service
                                  │
                                  ↓
                               MongoDB
```

The exact backend/AI hosting provider will be selected after performance and model requirements are known.

Use separate development/test/production environments.

Production secrets must never be committed to Git.

---

## 22. Security Architecture

Minimum requirements:

- TLS in transit
- secure authentication
- server-side authorization
- password hashing
- secrets management
- input validation
- output validation
- rate limiting
- CORS policy
- secure headers
- dependency scanning
- audit logging
- least privilege
- backup/recovery planning

Security must be reviewed before handling real sensitive data.

---

## 23. Failure Handling

Every external or AI dependency must have a failure path.

Examples:

- LLM unavailable → safe fallback response
- AI service unavailable → degrade functionality without fabricating analysis
- database unavailable → fail safely and avoid data loss
- notification failure → record failure and retry according to policy
- integration unavailable → stop processing and inform user where appropriate

Never invent AI analysis because a model failed.

---

## 24. Performance Strategy

Initial goals:

- responsive chat UI
- asynchronous heavy analysis where possible
- streaming LLM response where safe
- cached non-sensitive configuration
- indexed time-series queries
- pagination for histories
- bounded context windows

Optimize based on measured bottlenecks rather than premature complexity.

---

## 25. Architecture Decision Rules

Before introducing a new service, library, model, broker, or database, answer:

1. What problem does it solve?
2. Can an existing module solve it safely?
3. What operational complexity does it add?
4. What privacy/security implications exist?
5. How will it be tested?
6. What happens when it fails?

The simplest architecture that satisfies the requirements should win.

---

## 26. Implementation Order

1. Repository foundation
2. Architecture and database specifications
3. Environment/configuration
4. Authentication and authorization
5. User/relationship/consent model
6. Core backend API
7. Database layer
8. LLM abstraction
9. Python AI service
10. NLP/emotion/VAD
11. Conversation orchestration
12. Longitudinal analytics
13. Risk engine
14. Safety orchestration
15. Frontend foundation
16. User and guardian dashboards
17. Visualizations
18. Integrations
19. Testing/evaluation
20. Security hardening
21. Deployment

---

## 27. Architecture Status

This is the baseline architecture. Detailed API contracts, database schemas, threat model, sequence diagrams, model selection, and deployment configuration will be documented separately before production implementation.
