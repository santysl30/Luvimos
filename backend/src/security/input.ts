export function normalizeEmail(value: unknown): string {
  if (typeof value !== "string") throw new Error("Invalid email");
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email");
  }
  return email;
}

export function validatePassword(value: unknown): string {
  if (typeof value !== "string" || value.length < 12 || value.length > 128) {
    throw new Error("Password must contain 12-128 characters");
  }
  return value;
}
