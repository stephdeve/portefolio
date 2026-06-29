import { SkillForm } from '../SkillForm';
import { createSkill } from '../actions';

export const metadata = { title: 'Nouvelle compétence' };

export default function CreateSkillPage() {
  return <SkillForm action={createSkill} skill={{ id: null, name: '', level: 50, logo: null }} />;
}
