import { getSkills } from '@/lib/data';
import { SkillIcon } from '@/lib/icons';

export const metadata = {
  title: 'Compétences',
  description: 'Développement web, mobile, Cloud & DevOps — un écosystème de compétences orienté vers la construction de solutions complètes.',
};

export const dynamic = 'force-dynamic';

function levelLabel(level: number): string {
  if (level >= 80) return 'Avancé';
  if (level >= 50) return 'Intermédiaire';
  return 'Débutant';
}

function levelColor(level: number): string {
  if (level >= 80) return 'bg-green-500';
  if (level >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

function SkillBadge({ name, level, logo }: { name: string; level: number; logo: string | null }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <SkillIcon logo={logo} className="text-primary w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white shrink-0 ${levelColor(level)}`}>
            {levelLabel(level)}
          </span>
        </div>
        <div className="mt-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SoftSkillCard({ name }: { name: string }) {
  const emoji = name.includes('Résolution') ? '🧩'
    : name.includes('analyse') ? '🧠'
    : name.includes('Autonomie') ? '🎯'
    : name.includes('Apprentissage') ? '🚀'
    : name.includes('Adaptabilité') ? '🔄'
    : name.includes('Rigueur') ? '📏'
    : name.includes('innovation') ? '💡'
    : name.includes('équipe') ? '🤝'
    : name.includes('Communication') ? '🗣️'
    : '⭐';

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
      <span className="text-xl">{emoji}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
    </div>
  );
}

function SectionBlock({ title, icon, skills }: { title: string; icon: string; skills: { id: number; name: string; level: number; logo: string | null; category: string | null }[] }) {
  const isSoft = skills[0]?.category === 'soft';
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {skills.map((s) =>
            isSoft ? <SoftSkillCard key={s.id} name={s.name} /> : <SkillBadge key={s.id} name={s.name} level={s.level} logo={s.logo} />
          )}
        </div>
      </div>
    </section>
  );
}

function inferCategory(name: string): string | null {
  const n = name.toLowerCase();
  const web = ['php', 'javascript', 'typescript', 'html', 'css', 'react', 'vue', 'next.js', 'tailwind', 'mysql', 'rest api', 'sql', 'laravel', 'spring', 'java', 'backend', 'frontend'];
  const mobile = ['flutter', 'dart', 'mobile', 'sqlite'];
  const cloud = ['docker', 'kubernetes', 'k8s', 'aws', 'ecr', 'ci/cd', 'github action', 'linux', 'devops', 'cloud', 'containeurisation', 'déploiement'];
  const tools = ['git', 'github', 'postman', 'vs code', 'intellij', 'android studio', 'uml', 'plantuml', 'postgresql', 'redis', 'rabbitmq'];
  const softSkills = ['résolution', 'analyse', 'autonomie', 'apprentissage', 'adaptabilité', 'rigueur', 'innovation', 'équipe', 'communication', 'collaboration', 'créativité'];
  if (softSkills.some((k) => n.includes(k))) return 'soft';
  if (web.some((k) => n.includes(k))) return 'web';
  if (mobile.some((k) => n.includes(k))) return 'mobile';
  if (cloud.some((k) => n.includes(k))) return 'cloud';
  if (tools.some((k) => n.includes(k))) return 'tools';
  return null;
}

export default async function SkillsPage() {
  const allSkills = await getSkills();

  const categorized = allSkills.map((s) => ({
    ...s,
    category: s.category ?? inferCategory(s.name),
  }));

  const web = categorized.filter((s) => s.category === 'web');
  const mobile = categorized.filter((s) => s.category === 'mobile');
  const cloud = categorized.filter((s) => s.category === 'cloud');
  const tools = categorized.filter((s) => s.category === 'tools');
  const soft = categorized.filter((s) => s.category === 'soft');

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
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Un écosystème de compétences orienté vers la construction de solutions complètes, du frontend jusqu&apos;au cloud.
            </p>
          </div>
        </div>
      </section>

      {web.length > 0 && <SectionBlock title="Développement Web" icon="💻" skills={web} />}
      {mobile.length > 0 && <SectionBlock title="Développement Mobile" icon="📱" skills={mobile} />}
      {cloud.length > 0 && (
        <SectionBlock title="Cloud Computing & DevOps" icon="☁️" skills={cloud} />
      )}
      {tools.length > 0 && <SectionBlock title="Outils & Technologies" icon="🧰" skills={tools} />}
      {soft.length > 0 && <SectionBlock title="Soft Skills" icon="🧠" skills={soft} />}
    </div>
  );
}
