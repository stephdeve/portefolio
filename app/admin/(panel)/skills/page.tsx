import Link from 'next/link';
import { getSkills } from '@/lib/data';
import { Flash } from '@/components/admin/Flash';
import { DeleteForm } from '@/components/admin/DeleteForm';
import { SkillIcon } from '@/lib/icons';
import { deleteSkill } from './actions';

export const metadata = { title: 'Compétences' };
export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const skills = await getSkills();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compétences</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gérez vos compétences techniques</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
          href="/admin/skills/create"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle compétence
        </Link>
      </div>

      <Flash ok={searchParams.ok} err={searchParams.err} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SkillIcon logo={skill.logo} className="text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                </div>
                <span className="text-2xl font-bold text-primary">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out animate-fade-in"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Niveau de maîtrise</span>
                <div className="flex items-center gap-2">
                  <Link
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    href={`/admin/skills/edit?id=${skill.id}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Éditer
                  </Link>
                  <DeleteForm
                    action={deleteSkill}
                    id={skill.id}
                    confirmMessage="Supprimer cette compétence ? Cette action est irréversible."
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </DeleteForm>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
