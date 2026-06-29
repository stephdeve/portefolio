import { getSkills } from '@/lib/data';
import { SkillIcon } from '@/lib/icons';

export const metadata = {
  title: 'Compétences',
  description: 'Compétences techniques et humaines — langages, frameworks, outils, DevOps.',
};

export const dynamic = 'force-dynamic';

type SkillCat = 'lang' | 'tool' | 'devops';

function skillCategory(name: string): SkillCat {
  const n = name.toLowerCase();
  const langs = ['php', 'javascript', 'typescript', 'python', 'java', 'c#', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'mysql', 'postgresql', 'sqlite', 'nosql', 'mongodb', 'redis', 'html5/css3', 'html', 'css', 'sass', 'tailwind', 'react', 'vue', 'angular', 'next.js', 'node.js', 'express', 'rest apis', 'graphql'];
  const tools = ['git', 'linux', 'bash', 'vim', 'nginx', 'apache', 'webpack', 'vite', 'eslint', 'prettier'];
  if (langs.includes(n)) return 'lang';
  if (tools.includes(n)) return 'tool';
  return 'devops';
}

function SkillCardIcon({ logo, name: _name }: { logo: string | null; name: string }) {
  return <SkillIcon logo={logo} className="w-5 h-5 text-primary" />;
}

const SOFT_SKILLS = [
  { emoji: '🚀', label: 'Apprentissage continu' },
  { emoji: '🧩', label: 'Résolution de problèmes' },
  { emoji: '🧠', label: 'Esprit d\'analyse' },
  { emoji: '💡', label: 'Esprit d\'innovation' },
  { emoji: '🎯', label: 'Rigueur' },
  { emoji: '🤝', label: 'Collaboration' },
  { emoji: '🔄', label: 'Capacité d\'adaptation' },
  { emoji: '📈', label: 'Amélioration continue' },
];

function SkillCard({ name, level, logo }: { name: string; level: number; logo: string | null }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <SkillCardIcon logo={logo} name={name} />
        </div>
        <span className="font-semibold text-gray-900 dark:text-white">{name}</span>
        <span className="ml-auto text-sm font-bold text-primary">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

export default async function SkillsPage() {
  const allSkills = await getSkills();
  const langs = allSkills.filter((s) => skillCategory(s.name) === 'lang');
  const tools = allSkills.filter((s) => skillCategory(s.name) === 'tool');
  const devops = allSkills.filter((s) => skillCategory(s.name) === 'devops');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Expertise technique &amp; humaine
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mes{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                compétences
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un ensemble de compétences techniques et humaines pour concevoir des solutions
              robustes, innovantes et adaptées aux besoins du marché.
            </p>
          </div>
        </div>
      </section>

      {langs.length > 0 && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Langages &amp; Frameworks</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {langs.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} logo={s.logo} />)}
            </div>
          </div>
        </section>
      )}

      {tools.length > 0 && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Outils</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} logo={s.logo} />)}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compétences humaines</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOFT_SKILLS.map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-medium text-gray-900 dark:text-white">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {devops.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DevOps &amp; Cloud</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {devops.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} logo={s.logo} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}