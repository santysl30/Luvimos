import { Router } from "express";
import { registerUser, authenticateUser, getUserFromSession, revokeSession } from "../security/auth.js";
import { SESSION_COOKIE, sessionCookieOptions } from "../security/session.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body?.email, req.body?.password);
    res.status(201).json({ user });
  } catch {
    res.status(400).json({ error: "Unable to create account" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await authenticateUser(req.body?.email, req.body?.password);
    if (!result) return res.status(401).json({ error: "Invalid credentials" });
    res.cookie(SESSION_COOKIE, result.token, sessionCookieOptions(process.env.NODE_ENV === "production"));
    return res.status(200).json({ user: result.user });
  } catch {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/logout", (req, res) => {
  revokeSession(req.cookies?.[SESSION_COOKIE]);
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions(process.env.NODE_ENV === "production"));
  res.status(204).send();
});

router.get("/me", (req, res) => {
  const user = getUserFromSession(req.cookies?.[SESSION_COOKIE]);
  if (!user) return res.status(401).json({ error: "Authentication required" });
  return res.json({ user });
});

export default router;
