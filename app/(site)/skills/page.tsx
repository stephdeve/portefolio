import { getSkills } from '@/lib/data';

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

function SkillIcon({ name, className }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  const cls = className || 'w-8 h-8';

  if (n.includes('docker')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.8 6.4h-2.4v2.4h2.4V6.4zm0 4h-2.4v2.4h2.4v-2.4zm-4 0H6.4v2.4h2.4v-2.4zm-4 0H2.4v2.4h2.4v-2.4zm8-4h-2.4v2.4h2.4V6.4zm4 0h-2.4v2.4h2.4V6.4zm4 0h-2.4v2.4h2.4V6.4zm.8 4.8c-.4-1.6-2.4-2.4-2.4-2.4s-2.4 0-4.8 1.6c-1.6-3.2-5.6-4-5.6-4s-2.4 3.2-1.6 6.4c-.8.8-.8 1.6-.8 1.6h16.8c.8-1.6 0-4.8-1.6-7.2z"/></svg>;
  if (n.includes('kubernetes')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.5l7 3.5v7l-7 3.5-7-3.5V8l7-3.5z"/><circle cx="12" cy="12" r="3"/><path d="M12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>;
  if (n.includes('aws') || n.includes('ecr')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M3.4 15.7c-.2 0-.3-.1-.3-.3s.1-.3.3-.3h2.2c.2 0 .3.1.3.3s-.1.3-.3.3H3.4zm2.5-2.4c-.2 0-.3-.1-.3-.3s.1-.3.3-.3h3.4c.2 0 .3.1.3.3s-.1.3-.3.3H5.9zm-2.2-1.1c-.2 0-.3-.1-.3-.3s.1-.3.3-.3h4.5c.2 0 .3.1.3.3s-.1.3-.3.3H3.7zm10.8 3.8c-.2 0-.3-.1-.3-.3s.1-.3.3-.3H18c.2 0 .3.1.3.3s-.1.3-.3.3h-3.5zm-2.2-2.7c-.2 0-.3-.1-.3-.3s.1-.3.3-.3h4.3c.2 0 .3.1.3.3s-.1.3-.3.3h-4.3zm-1.4-1.8c-.2 0-.3-.1-.3-.3s.1-.3.3-.3h3.7c.2 0 .3.1.3.3s-.1.3-.3.3H12z"/></svg>;
  if (n.includes('github')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
  if (n.includes('git') && !n.includes('github')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12.8 2.8c-.8-.8-2-.8-2.8 0L2.8 10c-.8.8-.8 2 0 2.8l7.2 7.2c.8.8 2 .8 2.8 0l7.2-7.2c.8-.8.8-2 0-2.8L12.8 2.8zM12 17c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3h-2V7h2v7z"/></svg>;
  if (n.includes('linux')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;
  if (n.includes('php')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/></svg>;
  if (n.includes('javascript') || n.includes('js')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.048-.705.15-.646.915-.84 1.515-.66.39-.132.74-.197 1.024-.165 1.48.18 2.224.72 2.94 1.64 1.035 1.373.845 2.095.735 3.956.21 1.395-.39 2.44-1.255 3.175-.87.735-1.95 1.275-3.255 1.63-.45.12-.87.19-1.27.24-.735.12-1.25.12-1.8.045-.42-.06-.795-.165-1.125-.345-1.23-.75-1.815-1.425-1.815-3.105 0-1.095.345-1.86 1.095-2.34.675-.435 1.395-.6 2.115-.48.735.12 1.365.36 1.95.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18-1.26 0-2.22-.42-2.895-1.26-.675-.84-.945-1.815-.945-2.94 0-1.095.3-1.89.945-2.34.645-.45 1.38-.6 2.19-.48.81.12 1.53.36 2.16.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18z"/></svg>;
  if (n.includes('mysql') || n.includes('sql') || n.includes('bdd')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>;
  if (n.includes('html') || n.includes('css')) return <svg className={cls} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.56L4.07 16.13l-.93-10.26h17.72l-.93 10.26L12 17.56zM4.44 8.13l.74 8.26L12 17.5l6.82-1.11.74-8.26H4.44z"/></svg>;
  if (n.includes('rest api')) return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>;
  if (n.includes('ci/cd')) return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;

  return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>;
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

function SkillCard({ name, level }: { name: string; level: number }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <SkillIcon name={name} className="w-5 h-5 text-primary" />
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
              {langs.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} />)}
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
              {tools.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} />)}
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
              {devops.map((s) => <SkillCard key={s.id} name={s.name} level={s.level} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}