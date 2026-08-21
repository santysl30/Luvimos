export type UserRole = "user" | "guardian" | "admin";

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}

export function canAccessUserResource(actor: AuthenticatedUser, resourceUserId: string): boolean {
  if (actor.role === "admin") return true;
  return actor.id === resourceUserId;
}

export function requireRole(actor: AuthenticatedUser, roles: readonly UserRole[]): boolean {
  return roles.includes(actor.role);
}
