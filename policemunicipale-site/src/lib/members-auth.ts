import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const MEMBERS_COOKIE = "spmg_members";
/** Preferred env var; `ESPACE_MEMBRES_PASSWORD` is accepted as alias. */
export const MEMBERS_PASSWORD_ENV = "MEMBERS_PASSWORD";
export const MEMBERS_PASSWORD_ENV_ALIAS = "ESPACE_MEMBRES_PASSWORD";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getMembersPassword(): string | undefined {
  const preferred = process.env.MEMBERS_PASSWORD;
  if (preferred && preferred.length > 0) return preferred;
  const alias = process.env.ESPACE_MEMBRES_PASSWORD;
  if (alias && alias.length > 0) return alias;
  return undefined;
}

export function membersSessionToken(password: string): string {
  return createHmac("sha256", password)
    .update("spmg-espace-membres-v1")
    .digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function verifyMembersPassword(input: string): boolean {
  const expected = getMembersPassword();
  if (!expected) return false;
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isMembersAuthenticated(): Promise<boolean> {
  const password = getMembersPassword();
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(MEMBERS_COOKIE)?.value;
  if (!token) return false;
  return safeEqualHex(token, membersSessionToken(password));
}

export async function setMembersSession(): Promise<boolean> {
  const password = getMembersPassword();
  if (!password) return false;
  const jar = await cookies();
  jar.set(MEMBERS_COOKIE, membersSessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return true;
}

export async function clearMembersSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(MEMBERS_COOKIE);
}
