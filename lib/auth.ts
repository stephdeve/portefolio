// Admin authentication helpers.
//
// The original PHP app used a single admin account (ADMIN_USER + ADMIN_PASS_HASH)
// stored in PHP sessions. Here we issue a signed, HttpOnly cookie instead.
//
// Signing uses the Web Crypto API (HMAC-SHA256) so it works both in the Edge
// runtime (middleware) and the Node runtime (server actions / route handlers).

const COOKIE_NAME = 'admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

function getSecret(): string {
  // Prefer a dedicated secret; fall back to the password hash so the app still
  // works out of the box once ADMIN_PASS_HASH is set.
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASS_HASH ||
    'insecure-dev-secret-change-me';
  return secret;
}

function base64url(bytes: Uint8Array): string {
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64url(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return base64url(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

/** Create a signed session token for the given admin username. */
export async function createSessionToken(username: string): Promise<string> {
  const payload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const body = base64url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmac(body);
  return `${body}.${sig}`;
}

/** Verify a session token; returns the username if valid, otherwise null. */
export async function verifySessionToken(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = await hmac(body);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const json = JSON.parse(new TextDecoder().decode(fromBase64url(body))) as {
      u: string;
      exp: number;
    };
    if (typeof json.exp !== 'number' || json.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return json.u ?? null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  name: COOKIE_NAME,
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE_SECONDS,
  secure: process.env.NODE_ENV === 'production',
};
