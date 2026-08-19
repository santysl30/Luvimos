# Luvimos — AI Safety Specification

## Core Rule

Luvimos is a wellbeing-support system, not a diagnostic authority. AI outputs are probabilistic and must be treated accordingly.

## Layered Safety Architecture

```text
Input
 ↓
Validation
 ↓
NLP / semantic signals
 ↓
Emotion / VAD
 ↓
Longitudinal context
 ↓
Risk aggregation
 ↓
Policy engine
 ↓
Authorized action
```

The LLM may assist with interpretation and conversation but must not be the sole safety decision-maker.

## Risk Signals

Potential signals may include:

- explicit self-harm or harm-related language
- severe distress language
- persistent emotional deterioration
- abrupt changes from personal baseline
- repeated safety-related themes
- contextual indicators

Signals must be evaluated with confidence and context, not as deterministic proof of a mental-health condition.

## False Positives and False Negatives

The system must explicitly evaluate both.

Safety evaluation should measure:

- recall/sensitivity
- precision
- false-positive rate
- false-negative rate
- calibration where feasible

No design may claim guaranteed detection.

## Response Principles

When concern is detected, the system should:

- respond calmly and supportively
- avoid diagnosis
- avoid judgment
- encourage appropriate human support
- use configured escalation policies
- disclose only necessary information

## Guardian Notifications

Guardian/Care Circle notifications must be authorized by policy and relationship/consent rules. They should contain the minimum information needed for the action.

Do not automatically transmit entire private conversations.

## Emergency Workflows

Emergency workflows must be jurisdiction-aware and verified. The system must never invent emergency contact information.

## Human Oversight

High-impact safety decisions should have a defined human-support path wherever the deployment context provides one.

## Prompt Injection and Untrusted Content

Treat user text, imported content, and integration content as untrusted. They must never be able to override system safety rules, reveal secrets, or authorize privileged actions.

## Tool/Action Safety

LLM-generated tool calls must pass through:

1. schema validation
2. authorization
3. policy validation
4. parameter validation
5. audit logging where appropriate

## Model Versioning

Record model/version identifiers for safety-relevant inferences so results can be evaluated and reproduced.

## Evaluation Before Real-World Use

Before real sensitive-user deployment, perform controlled testing with representative synthetic/approved datasets, adversarial cases, edge cases, age-aware scenarios, and failure simulations.
