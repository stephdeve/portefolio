import { getSkills } from '@/lib/data';

export const metadata = {
  title: 'Compétences',
  description: "Un ensemble de compétences pour créer des solutions complètes — développement web, mobile, Cloud & DevOps.",
};

export const dynamic = 'force-dynamic';

function inferCategory(name: string): string | null {
  const n = name.toLowerCase();
  const web = ['php', 'javascript', 'typescript', 'html', 'css', 'react', 'vue', 'next.js', 'tailwind', 'mysql', 'rest api', 'sql', 'laravel', 'spring', 'java', 'backend', 'frontend', 'alpine.js', 'livewire', 'api'];
  const mobile = ['flutter', 'dart', 'mobile', 'sqlite', 'ui/ux'];
  const cloud = ['docker', 'kubernetes', 'k8s', 'aws', 'ecr', 'ci/cd', 'github action', 'linux', 'devops', 'cloud', 'containeurisation', 'déploiement', 'surveillance', 'logs', 'ubuntu', 'nginx'];
  const tools = ['git', 'github', 'postman', 'vs code', 'intellij', 'android studio', 'uml', 'plantuml', 'postgresql', 'redis', 'rabbitmq', 'mysql', 'windows server'];
  const softSkills = ['résolution', 'analyse', 'autonomie', 'apprentissage', 'adaptabilité', 'rigueur', 'innovation', 'équipe', 'communication', 'collaboration', 'créativité', 'gestion', 'priorités'];
  if (softSkills.some((k) => n.includes(k))) return 'soft';
  if (web.some((k) => n.includes(k))) return 'web';
  if (mobile.some((k) => n.includes(k))) return 'mobile';
  if (cloud.some((k) => n.includes(k))) return 'cloud';
  if (tools.some((k) => n.includes(k))) return 'tools';
  return null;
}

const FRONTEND_KEYWORDS = ['html', 'css', 'javascript', 'typescript', 'react', 'vue', 'next.js', 'tailwind', 'alpine.js', 'frontend'];
const BACKEND_KEYWORDS = ['php', 'java', 'spring', 'laravel', 'livewire', 'api rest', 'backend', 'jwt', 'spring security', 'sql'];

function isFrontend(name: string): boolean {
  const n = name.toLowerCase();
  return FRONTEND_KEYWORDS.some((k) => n.includes(k));
}

function isBackend(name: string): boolean {
  const n = name.toLowerCase();
  return BACKEND_KEYWORDS.some((k) => n.includes(k));
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

  const webFrontend = web.filter((s) => isFrontend(s.name));
  const webBackend = web.filter((s) => isBackend(s.name));
  const webOther = web.filter((s) => !isFrontend(s.name) && !isBackend(s.name));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Expertise technique &amp; humaine
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mes{' '}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              compétences
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Un ensemble de compétences pour créer des solutions complètes, du frontend jusqu&apos;au cloud.
          </p>
        </div>

        {/* ========== GRILLE DES CARTES ========== */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* 01 – Développement Web */}
          <SkillCard number="01" title="Développement Web"
            desc="Conception et développement d'applications web modernes et performantes."
            delay="0.1s"
          >
            {webFrontend.length > 0 && (
              <SkillGroup title="FRONTEND">
                {webFrontend.map((s) => (
                  <SkillBar key={s.id} label={s.name} percent={s.level} />
                ))}
              </SkillGroup>
            )}
            {webBackend.length > 0 && (
              <SkillGroup title="BACKEND">
                {webBackend.map((s) => (
                  <SkillBar key={s.id} label={s.name} percent={s.level} />
                ))}
              </SkillGroup>
            )}
            {webOther.length > 0 && (
              <SkillGroup>
                {webOther.map((s) => (
                  <SkillBar key={s.id} label={s.name} percent={s.level} />
                ))}
              </SkillGroup>
            )}
          </SkillCard>

          {/* 02 – Développement Mobile */}
          <SkillCard number="02" title="Développement Mobile"
            desc="Création d'applications mobiles fluides et intuitives."
            delay="0.2s"
          >
            <SkillGroup>
              {mobile.length > 0 ? (
                mobile.map((s) => (
                  <SkillBar key={s.id} label={s.name} percent={s.level} />
                ))
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">Aucune compétence mobile pour le moment.</p>
              )}
            </SkillGroup>
          </SkillCard>

          {/* 03 – Cloud Computing & DevOps */}
          <SkillCard number="03" title="Cloud Computing &amp; DevOps"
            desc="Déploiement, automatisation et gestion d'infrastructures cloud."
            delay="0.3s"
          >
            <SkillGroup>
              {cloud.length > 0 ? (
                cloud.map((s) => (
                  <SkillBar key={s.id} label={s.name} percent={s.level} />
                ))
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">Aucune compétence cloud pour le moment.</p>
              )}
            </SkillGroup>
          </SkillCard>

          {/* 04 – Outils & Technologies */}
          <SkillCard number="04" title="Outils &amp; Technologies"
            desc="Outils et technologies que j'utilise au quotidien pour développer et déployer."
            delay="0.4s"
          >
            {tools.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tools.map((s) => (
                  <span key={s.id} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">Aucun outil référencé pour le moment.</p>
            )}
          </SkillCard>

          {/* 05 – Compétences Humaines */}
          <SkillCard number="05" title="Compétences Humaines"
            desc="Des soft skills essentielles pour mener à bien les projets et collaborer efficacement."
            delay="0.5s"
            className="md:col-span-2"
          >
            {soft.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {soft.map((s) => (
                  <span key={s.id} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">Aucune compétence humaine pour le moment.</p>
            )}
          </SkillCard>

        </div>

        {/* ========== BANDEAU ========== */}
        <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200 dark:border-gray-800 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-3xl mx-auto">
            <span className="text-3xl mb-4 block">🚀</span>
            <p className="text-lg md:text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-bold">
                Toujours en quête d&apos;apprendre et de créer !
              </span>
              <br />
              <span className="text-gray-600 dark:text-gray-400">
                Je m&apos;efforce chaque jour d&apos;améliorer mes compétences et d&apos;explorer de nouvelles technologies pour construire des solutions innovantes.
              </span>
            </p>
          </div>
        </div>

        {/* ========== STATISTIQUES ========== */}
        <div className="flex flex-wrap justify-around gap-8 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <StatItem number={String(allSkills.length)} label="Compétences enregistrées" />
          <StatItem number={String(web.length)} label="Web" />
          <StatItem number={String(mobile.length + cloud.length)} label="Mobile &amp; Cloud" />
          <StatItem number={String(tools.length + soft.length)} label="Outils &amp; Soft" />
        </div>

      </div>
    </div>
  );
}

/* ===== COMPOSANTS ===== */

function SkillCard({
  number, title, desc, children, delay = '0s', className = '',
}: {
  number: string; title: string; desc: string; children: React.ReactNode; delay?: string; className?: string;
}) {
  return (
    <div
      className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-3xl font-bold text-primary/30 dark:text-primary/20 tracking-tight shrink-0 leading-none">
          {number}
        </span>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SkillGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className={title ? 'mb-4' : ''}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary/70 dark:text-primary/50">
            {title}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function SkillBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="mb-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full">
          {percent}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent leading-tight">
        {number}
      </div>
      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium mt-1">{label}</div>
    </div>
  );
}
