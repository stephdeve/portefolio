import { getSkills } from '@/lib/data';

export const metadata = {
  title: 'Compétences',
  description: 'Compétences techniques: PHP, JavaScript, MySQL, Git, et plus.',
};

export const dynamic = 'force-dynamic';

const ICON_PATHS: Record<string, string> = {
  php: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z',
  javascript:
    'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.048-.705.15-.646.915-.84 1.515-.66.39-.132.74-.197 1.024-.165 1.48.18 2.224.72 2.94 1.64 1.035 1.373.845 2.095.735 3.956.21 1.395-.39 2.44-1.255 3.175-.87.735-1.95 1.275-3.255 1.63-.45.12-.87.19-1.27.24-.735.12-1.25.12-1.8.045-.42-.06-.795-.165-1.125-.345-1.23-.75-1.815-1.425-1.815-3.105 0-1.095.345-1.86 1.095-2.34.675-.435 1.395-.6 2.115-.48.735.12 1.365.36 1.95.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18-1.26 0-2.22-.42-2.895-1.26-.675-.84-.945-1.815-.945-2.94 0-1.095.3-1.89.945-2.34.645-.45 1.38-.6 2.19-.48.81.12 1.53.36 2.16.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18z',
  html: 'M12 17.56L4.07 16.13l-.93-10.26h17.72l-.93 10.26L12 17.56zM4.44 8.13l.74 8.26L12 17.5l6.82-1.11.74-8.26H4.44z',
};

const GENERIC_ICON = (
  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

function category(name: string): string {
  const n = name.toLowerCase();
  if (['php', 'mysql', 'sqlite', 'postgresql'].includes(n)) return 'Backend';
  if (['javascript', 'typescript', 'react', 'vue', 'angular'].includes(n)) return 'Frontend';
  if (['html', 'css', 'sass', 'tailwind'].includes(n)) return 'Design';
  if (['git', 'docker', 'linux', 'nginx'].includes(n)) return 'DevOps';
  return 'Autre';
}

export default async function SkillsPage() {
  const skills = await getSkills();
  const count = skills.length;
  const avg = count > 0 ? Math.floor(skills.reduce((sum, s) => sum + s.level, 0) / count) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              {GENERIC_ICON_SMALL}
              Expertise technique
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mes{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                compétences
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Une maîtrise solide des technologies web modernes pour développer des applications
              robustes, performantes et évolutives.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => {
              const n = skill.name.toLowerCase();
              const iconPath = ICON_PATHS[n];
              return (
                <div
                  key={skill.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-primary">{skill.level}%</span>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {iconPath ? (
                          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d={iconPath} />
                          </svg>
                        ) : (
                          GENERIC_ICON
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Niveau de maîtrise</span>
                      <span className="font-medium text-gray-900 dark:text-white">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out animate-fade-in"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Catégorie</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {category(skill.name)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              En{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                chiffres
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une expertise acquise à travers de nombreux projets et années d&apos;expérience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{count}</div>
              <div className="text-gray-600 dark:text-gray-400">Technologies maîtrisées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{avg}%</div>
              <div className="text-gray-600 dark:text-gray-400">Niveau moyen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-400">Ans d&apos;expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Projets réalisés</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const GENERIC_ICON_SMALL = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
