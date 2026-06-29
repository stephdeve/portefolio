import { Flash } from '@/components/admin/Flash';
import { ProjectForm } from '../ProjectForm';
import { createProject } from '../actions';

export const metadata = { title: 'Nouveau projet' };

export default function CreateProjectPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  return (
    <>
      <Flash ok={searchParams.ok} err={searchParams.err} />
      <ProjectForm
        action={createProject}
        project={{ id: null, title: '', stack: [], description: '', github: '', link: '', image: null, imageAlt: null }}
      />
    </>
  );
}
