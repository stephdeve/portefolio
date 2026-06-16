import { redirect } from 'next/navigation';
import { getProject } from '@/lib/data';
import { ProjectForm } from '../ProjectForm';
import { updateProject } from '../actions';

export const metadata = { title: 'Modifier le projet' };
export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = Number.parseInt(searchParams.id ?? '', 10) || 0;
  const project = id > 0 ? await getProject(id) : null;
  if (!project) {
    redirect('/admin/projects?err=' + encodeURIComponent('Projet introuvable.'));
  }
  return <ProjectForm action={updateProject} project={project} />;
}
