import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SkillForm } from '../SkillForm';
import { updateSkill } from '../actions';

export const metadata = { title: 'Modifier la compétence' };
export const dynamic = 'force-dynamic';

export default async function EditSkillPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = Number.parseInt(searchParams.id ?? '', 10) || 0;
  const skill = id > 0 ? await prisma.skill.findUnique({ where: { id } }) : null;
  if (!skill) {
    redirect('/admin/skills?err=' + encodeURIComponent('Compétence introuvable.'));
  }
  return (
    <SkillForm action={updateSkill} skill={{ id: skill.id, name: skill.name, level: skill.level }} />
  );
}
