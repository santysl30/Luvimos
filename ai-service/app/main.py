import os
import secrets
from datetime import datetime, timezone

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.trustedhost import TrustedHostMiddleware

AI_SERVICE_TOKEN = os.getenv("AI_SERVICE_TOKEN")

app = FastAPI(
    title="Luvimos AI Service",
    version="0.1.0",
    description="AI, NLP, emotion, VAD, and safety intelligence service for Luvimos.",
    docs_url=None if os.getenv("ENVIRONMENT") == "production" else "/docs",
    redoc_url=None if os.getenv("ENVIRONMENT") == "production" else "/redoc",
)

# The AI service is intended to sit behind the backend, not directly on the public internet.
allowed_hosts = [
    host.strip()
    for host in os.getenv("AI_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    if host.strip()
]
app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)


def require_internal_token(authorization: str | None) -> None:
    if not AI_SERVICE_TOKEN:
        raise HTTPException(status_code=503, detail="AI service authentication is not configured")

    expected = f"Bearer {AI_SERVICE_TOKEN}"
    if not authorization or not secrets.compare_digest(authorization, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "luvimos-ai-service",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/internal/health")
async def internal_health(authorization: str | None = Header(default=None)):
    require_internal_token(authorization)
    return {
        "status": "ok",
        "service": "luvimos-ai-service",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
