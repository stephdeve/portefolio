'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/server-auth';

export async function deleteContact(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number.parseInt(String(formData.get('id') ?? ''), 10) || 0;
  if (id > 0) {
    await prisma.contact.delete({ where: { id } }).catch(() => {});
    revalidatePath('/admin/contacts');
    redirect('/admin/contacts?ok=' + encodeURIComponent('Message supprimé.'));
  }
  redirect('/admin/contacts');
}
