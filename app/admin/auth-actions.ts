'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSessionToken, sessionCookieOptions, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { verifyCredentials } from '@/lib/server-auth';

export interface LoginState {
  error: string | null;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!(await verifyCredentials(username, password))) {
    return { error: 'Identifiants invalides.' };
  }

  const token = await createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set({ ...sessionCookieOptions, value: token });
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect('/admin/login');
}
