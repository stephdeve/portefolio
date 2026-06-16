import { ProjectForm } from '../ProjectForm';
import { createProject } from '../actions';

export const metadata = { title: 'Nouveau projet' };

export default function CreateProjectPage() {
  return (
    <ProjectForm
      action={createProject}
      project={{ id: null, title: '', stack: [], description: '', github: '', link: '', image: null, imageAlt: null }}
    />
  );
}
