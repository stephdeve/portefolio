'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/server-auth';

function flash(path: string, type: 'ok' | 'err', message: string): never {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export async function createSkill(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  const level = Number.parseInt(String(formData.get('level') ?? ''), 10) || 0;
  const logo = String(formData.get('logo') ?? '').trim() || null;
  if (name === '' || level < 0 || level > 100) {
    flash('/admin/skills/create', 'err', 'Nom ou niveau invalide.');
  }
  await prisma.skill.create({ data: { name, level, logo } });
  revalidatePath('/admin/skills');
  revalidatePath('/skills');
  flash('/admin/skills', 'ok', 'Compétence créée.');
}

export async function updateSkill(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number.parseInt(String(formData.get('id') ?? ''), 10) || 0;
  const name = String(formData.get('name') ?? '').trim();
  const level = Number.parseInt(String(formData.get('level') ?? ''), 10) || 0;
  const logo = String(formData.get('logo') ?? '').trim() || null;
  if (id > 0 && name !== '' && level >= 0 && level <= 100) {
    await prisma.skill.update({ where: { id }, data: { name, level, logo } });
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    flash('/admin/skills', 'ok', 'Compétence mise à jour.');
  }
  flash('/admin/skills', 'err', 'Données invalides.');
}

export async function deleteSkill(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number.parseInt(String(formData.get('id') ?? ''), 10) || 0;
  if (id > 0) {
    await prisma.skill.delete({ where: { id } }).catch(() => {});
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    flash('/admin/skills', 'ok', 'Compétence supprimée.');
  }
  redirect('/admin/skills');
}
