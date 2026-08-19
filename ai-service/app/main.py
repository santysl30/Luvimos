from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(
    title="Luvimos AI Service",
    version="0.1.0",
    description="AI, NLP, emotion, VAD, and safety intelligence service for Luvimos.",
)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "luvimos-ai-service",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }