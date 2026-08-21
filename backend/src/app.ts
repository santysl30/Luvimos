import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import crypto from "node:crypto";

const app = express();

// Security baseline: do not reveal framework details.
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

const allowedOrigins = new Set(
  (process.env.FRONTEND_URL ?? "http://localhost:3000")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser/server-to-server requests while strictly limiting browsers.
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS origin denied"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  }),
);

// Keep request bodies deliberately small. Luvimos should never accept arbitrary payloads.
app.use(express.json({ limit: "256kb", strict: true }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

// Correlate requests without putting user data into logs.
app.use((req: Request, res: Response, next: NextFunction) => {
  const supplied = req.header("X-Request-ID");
  const requestId = supplied && /^[A-Za-z0-9._-]{8,80}$/.test(supplied)
    ? supplied
    : crypto.randomUUID();

  res.setHeader("X-Request-ID", requestId);
  next();
});

// Conservative in-memory limiter for the initial development API.
// Replace with a distributed limiter (e.g. Redis-backed) before production scaling.
const requestBuckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120;

app.use((req: Request, res: Response, next: NextFunction) => {
  const key = req.ip ?? "unknown";
  const now = Date.now();
  const current = requestBuckets.get(key);

  if (!current || current.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  current.count += 1;
  if (current.count > MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    res.setHeader("Retry-After", retryAfter);
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  next();
});

// Prevent caching of API responses that may eventually contain sensitive data.
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "luvimos-backend",
    timestamp: new Date().toISOString(),
  });
});

// Do not leak stack traces, framework errors, secrets, or internal paths to clients.
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error && error.message === "CORS origin denied") {
    res.status(403).json({ error: "Origin not allowed" });
    return;
  }

  console.error("Unhandled API error", {
    name: error instanceof Error ? error.name : "UnknownError",
  });

  res.status(500).json({ error: "Internal server error" });
});

export default app;
