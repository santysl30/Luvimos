import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import crypto from "node:crypto";
import authRouter from "./routes/auth.js";

const app = express();
app.disable("x-powered-by");

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

const allowedOrigins = new Set(
  (process.env.FRONTEND_URL ?? "http://localhost:3000").split(",").map((v) => v.trim()).filter(Boolean),
);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("CORS origin denied"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
}));

app.use(express.json({ limit: "256kb", strict: true }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  const supplied = req.header("X-Request-ID");
  const requestId = supplied && /^[A-Za-z0-9._-]{8,80}$/.test(supplied) ? supplied : crypto.randomUUID();
  res.setHeader("X-Request-ID", requestId);
  next();
});

const requestBuckets = new Map<string, { count: number; resetAt: number }>();
app.use((req: Request, res: Response, next: NextFunction) => {
  const key = req.ip ?? "unknown";
  const now = Date.now();
  const current = requestBuckets.get(key);
  if (!current || current.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + 60_000 });
    return next();
  }
  current.count += 1;
  if (current.count > 120) {
    res.setHeader("Retry-After", Math.max(1, Math.ceil((current.resetAt - now) / 1000)));
    return res.status(429).json({ error: "Too many requests" });
  }
  return next();
});

app.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use("/api/v1/auth", authRouter);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "luvimos-backend", timestamp: new Date().toISOString() });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error && error.message === "CORS origin denied") return res.status(403).json({ error: "Origin not allowed" });
  console.error("Unhandled API error", { name: error instanceof Error ? error.name : "UnknownError" });
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
