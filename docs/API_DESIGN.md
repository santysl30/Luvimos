# Luvimos — API Design Baseline

## Principles

- Version APIs from the beginning.
- Validate all inputs.
- Authenticate and authorize server-side.
- Never expose privileged database operations directly to clients.
- Return structured errors.
- Do not leak secrets or unnecessary sensitive data.
- Keep AI providers behind internal abstractions.

## API Version

Initial public API prefix:

```text
/api/v1
```

## Core Domains

### Authentication

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

### Users

```text
GET  /api/v1/me
PATCH /api/v1/me
```

### Care Circle

```text
GET  /api/v1/care-circle
POST /api/v1/care-circle/invitations
POST /api/v1/care-circle/invitations/:id/accept
PATCH /api/v1/care-circle/:id/permissions
DELETE /api/v1/care-circle/:id
```

### Consent / Privacy

```text
GET  /api/v1/consents
POST /api/v1/consents
PATCH /api/v1/consents/:id
GET  /api/v1/privacy/data-summary
POST /api/v1/privacy/export
POST /api/v1/privacy/deletion-request
```

### Conversations

```text
POST /api/v1/conversations
GET  /api/v1/conversations
GET  /api/v1/conversations/:id
POST /api/v1/conversations/:id/messages
```

Conversation endpoints must enforce ownership/permission checks.

### Mood / Emotional Data

```text
POST /api/v1/moods
GET  /api/v1/moods
GET  /api/v1/emotions/timeline
GET  /api/v1/vad/timeline
```

### Analytics

```text
GET /api/v1/analytics/overview
GET /api/v1/analytics/trends
GET /api/v1/analytics/patterns
```

Analytics responses should avoid exposing raw sensitive content unless explicitly required and authorized.

### Safety

```text
GET /api/v1/safety/status
GET /api/v1/safety/events
```

Creation of privileged safety actions should occur internally through the safety orchestration layer, not through an unrestricted client endpoint.

## Internal AI API

The Node backend communicates with the Python AI service through an internal authenticated interface.

Conceptual operations:

```text
POST /internal/v1/analyze/text
POST /internal/v1/analyze/emotion
POST /internal/v1/analyze/vad
POST /internal/v1/analyze/risk-signals
```

Internal endpoints must not be publicly exposed.

## Error Format

Use a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request could not be processed.",
    "request_id": "..."
  }
}
```

Do not return stack traces, secrets, model prompts, or internal infrastructure details.

## Pagination

List endpoints should support cursor or page-based pagination. Cursor pagination is preferred for large histories.

## Rate Limits

Apply rate limits according to endpoint sensitivity and expected usage. Authentication, conversation, AI, and integration endpoints require stricter controls.

## API Documentation

Final implementation should expose an OpenAPI specification after schemas and authentication details are finalized.
