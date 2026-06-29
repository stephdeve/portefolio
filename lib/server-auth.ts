import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { config } from './config';
import { ADMIN_COOKIE_NAME, verifySessionToken } from './auth';

/** Returns the logged-in admin username, or null. */
export async function getAdminUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function isAdmin(): Promise<boolean> {
  return (await getAdminUser()) !== null;
}

/** Redirect to the login page when not authenticated. Use in admin pages/actions. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }
}

function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

/**
 * Verify admin credentials against ADMIN_USER + ADMIN_PASS_HASH.
 * ADMIN_PASS_HASH is a bcrypt hash, compatible with PHP's password_hash().
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const expectedUser = config.admin.user;
  const expectedHash = config.admin.passHash;
  if (!expectedUser || !expectedHash) return false;
  if (!timingSafeStringEqual(expectedUser, username)) return false;
  try {
    return await bcrypt.compare(password, expectedHash);
  } catch {
    return false;
  }
}
