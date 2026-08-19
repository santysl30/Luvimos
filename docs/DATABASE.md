# Luvimos — Database Design Baseline

**Initial recommendation:** MongoDB

This is a logical baseline. Concrete collection schemas, indexes, validation rules, retention policies, and encryption strategy must be finalized before production implementation.

## Collections

### users

Identity and account-level information.

Conceptual fields:

```text
_id
email / login identifier
status
created_at
updated_at
```

Do not store secrets in plain text.

### profiles

```text
user_id
age_band
display_name
preferences
locale
timezone
created_at
updated_at
```

Store the minimum required profile information.

### relationships

```text
_id
subject_user_id
related_user_id
relationship_type
status
permissions
consent_reference
created_at
updated_at
```

### consents

```text
_id
user_id
actor_id
purpose
scope
status
policy_version
given_at
revoked_at
```

### conversations

```text
_id
user_id
status
created_at
updated_at
retention_policy
```

### messages

```text
_id
conversation_id
sender_type
content_reference / content
created_at
processing_status
```

Message storage and retention should be configurable. Avoid storing content unnecessarily.

### emotion_records

```text
_id
user_id
message_reference
emotion
confidence
source
model_version
timestamp
```

### vad_records

```text
_id
user_id
message_reference
valence
arousal
dominance
confidence
source
model_version
timestamp
```

### mood_records

```text
_id
user_id
mood
intensity
note_reference
timestamp
```

### behavioral_signals

```text
_id
user_id
signal_type
features
confidence
source
model_version
timestamp
```

### risk_events

```text
_id
user_id
risk_level
confidence
signal_references
policy_version
model_version
timestamp
status
```

### safety_actions

```text
_id
user_id
risk_event_id
action_type
recipient_reference
status
created_at
completed_at
```

### notifications

```text
_id
recipient_user_id
type
priority
minimal_payload
status
created_at
sent_at
```

### integrations

```text
_id
user_id
provider
status
scopes
authorization_reference
created_at
revoked_at
```

Provider tokens must be protected and should not be exposed to application clients.

### audit_events

```text
_id
actor_id
action
resource_type
resource_id
metadata
timestamp
```

Do not store unnecessary sensitive content in audit metadata.

### model_metadata

```text
_id
component
model_name
model_version
configuration_reference
evaluation_reference
created_at
```

## Relationships

```text
User
 ├── Profile
 ├── Conversations
 │    └── Messages
 ├── Emotion Records
 ├── VAD Records
 ├── Mood Records
 ├── Behavioral Signals
 ├── Risk Events
 ├── Safety Actions
 ├── Consents
 ├── Relationships
 └── Integrations
```

## Indexing

Expected indexes include:

- user identifiers
- conversation ownership
- message conversation/time
- emotion user/time
- VAD user/time
- mood user/time
- risk user/time
- relationships subject/related user
- consent user/purpose
- audit actor/time

Exact indexes should be validated against actual query patterns.

## Data Separation

Keep identity/account data logically separate from high-sensitivity emotional/conversation data. Application modules should only access the domains required for their function.

## Retention

Every sensitive collection should have a documented retention purpose and deletion strategy before production.

## Synthetic Development Data

Development should use synthetic fixtures. Real user conversations must not be committed to GitHub.

## Schema Validation

Use application-level validation plus database validation where practical. Reject malformed AI outputs before persistence.
