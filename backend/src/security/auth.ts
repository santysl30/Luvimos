import crypto from "node:crypto";
import { hashPassword, verifyPassword } from "./password.js";
import { createSessionToken, hashSessionToken } from "./session.js";
import { normalizeEmail, validatePassword } from "./input.js";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  role: "user" | "guardian" | "admin";
}

// Temporary in-memory store for the authentication contract.
// Replace with MongoDB persistence before production or real user data.
const users = new Map<string, UserRecord>();
const sessions = new Map<string, { userId: string; expiresAt: number }>();

export async function registerUser(emailInput: unknown, passwordInput: unknown) {
  const email = normalizeEmail(emailInput);
  const password = validatePassword(passwordInput);
  if (users.has(email)) throw new Error("Account already exists");

  const user: UserRecord = {
    id: crypto.randomUUID(),
    email,
    passwordHash: await hashPassword(password),
    role: "user",
  };
  users.set(email, user);
  return { id: user.id, email: user.email, role: user.role };
}

export async function authenticateUser(emailInput: unknown, passwordInput: unknown) {
  const email = normalizeEmail(emailInput);
  const password = validatePassword(passwordInput);
  const user = users.get(email);
  if (!user || !(await verifyPassword(user.passwordHash, password))) return null;

  const token = createSessionToken();
  sessions.set(hashSessionToken(token), {
    userId: user.id,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export function getUserFromSession(token: string | undefined) {
  if (!token) return null;
  const session = sessions.get(hashSessionToken(token));
  if (!session || session.expiresAt <= Date.now()) return null;
  for (const user of users.values()) {
    if (user.id === session.userId) return { id: user.id, email: user.email, role: user.role };
  }
  return null;
}

export function revokeSession(token: string | undefined) {
  if (token) sessions.delete(hashSessionToken(token));
}
