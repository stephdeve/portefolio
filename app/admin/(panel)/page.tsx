import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Tableau de bord' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projects, skills, contacts, contactsRecent, skillGroups] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.contact.count(),
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.skill.groupBy({
      by: ['category'],
      _count: { id: true },
      orderBy: [{ _count: { id: 'desc' } }],
    }),
  ]);

  const topSkills = await prisma.skill.findMany({
    orderBy: { level: 'desc' },
    take: 5,
  });

  const categoryColors: Record<string, string> = {
    web: 'from-primary to-purple-500',
    mobile: 'from-purple-500 to-pink-500',
    cloud: 'from-cyan-500 to-blue-500',
    tools: 'from-orange-500 to-red-500',
    soft: 'from-green-500 to-teal-500',
  };
  const categoryLabels: Record<string, string> = {
    web: 'Web',
    mobile: 'Mobile',
    cloud: 'Cloud & DevOps',
    tools: 'Outils',
    soft: 'Soft Skills',
  };

  const maxSkills = Math.max(...skillGroups.map((g) => g._count.id), 1);

  const now = new Date();
  const daysSinceEpoch = Math.floor(now.getTime() / 86400000);
  const activityLevel = ((projects + skills + contacts) % 20) + 60;

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* ========== EN-TÊTE ========== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Vue d&apos;ensemble de votre portfolio
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* ========== STATS CARDS ========== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
          value={projects}
          label="Projets"
          gradient="from-primary to-purple-500"
          iconBg="bg-primary/10"
          iconColor="text-primary"
          href="/admin/projects"
        />
        <StatCard
          icon={<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
          value={skills}
          label="Compétences"
          gradient="from-purple-500 to-pink-500"
          iconBg="bg-purple-500/10"
          iconColor="text-purple-500"
          href="/admin/skills"
        />
        <StatCard
          icon={<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
          value={contacts}
          label="Messages"
          gradient="from-green-500 to-teal-500"
          iconBg="bg-green-500/10"
          iconColor="text-green-500"
          href="/admin/contacts"
        />
        <StatCard
          icon={<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
          value={skillGroups.length}
          label="Catégories"
          gradient="from-orange-500 to-red-500"
          iconBg="bg-orange-500/10"
          iconColor="text-orange-500"
          href="/admin/settings"
        />
      </div>

      {/* ========== ROW 2: RÉPARTITION + TOP SKILLS ========== */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* GRAPHIQUE RÉPARTITION PAR CATÉGORIE */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Répartition des compétences</h2>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              {skills} total
            </span>
          </div>

          <div className="space-y-4">
            {skillGroups.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic text-center py-8">
                Aucune compétence pour le moment.
              </p>
            ) : (
              skillGroups.map((group) => {
                const pct = (group._count.id / maxSkills) * 100;
                return (
                  <div key={group.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {categoryLabels[group.category ?? ''] ?? group.category ?? 'Non catégorisé'}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {group._count.id}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${categoryColors[group.category ?? ''] || 'from-gray-400 to-gray-500'} transition-all duration-1000`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Mini donut en SVG */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              Aperçu
            </h3>
            <div className="flex items-center gap-6">
              <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
                {skillGroups.length > 0 ? (
                  (() => {
                    const total = skillGroups.reduce((a, g) => a + g._count.id, 0);
                    const colors = ['#6366F1', '#A855F7', '#06B6D4', '#F97316', '#10B981'];
                    let cumulative = 0;
                    const slices = skillGroups.map((g, i) => {
                      const pct = (g._count.id / total) * 360;
                      const startAngle = cumulative;
                      cumulative += pct;
                      const startRad = ((startAngle - 90) * Math.PI) / 180;
                      const endRad = ((startAngle + pct - 90) * Math.PI) / 180;
                      const x1 = 40 + 35 * Math.cos(startRad);
                      const y1 = 40 + 35 * Math.sin(startRad);
                      const x2 = 40 + 35 * Math.cos(endRad);
                      const y2 = 40 + 35 * Math.sin(endRad);
                      const largeArc = pct > 180 ? 1 : 0;
                      return (
                        <path
                          key={g.category}
                          d={`M40 40 L${x1} ${y1} A35 35 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={colors[i % colors.length]}
                        />
                      );
                    });
                    return slices;
                  })()
                ) : (
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                )}
                <circle cx="40" cy="40" r="18" fill="white" className="dark:fill-gray-900" />
              </svg>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {skillGroups.map((g, i) => {
                  const colors = ['#6366F1', '#A855F7', '#06B6D4', '#F97316', '#10B981'];
                  return (
                    <div key={g.category} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {categoryLabels[g.category ?? ''] ?? g.category ?? 'NC'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* TOP SKILLS */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top compétences
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">(par niveau)</span>
            </h2>
            <Link
              href="/admin/skills"
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Voir tout
            </Link>
          </div>

          <div className="space-y-3">
            {topSkills.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic text-center py-8">
                Aucune compétence pour le moment.
              </p>
            ) : (
              topSkills.map((skill, i) => {
                const rankColors = ['text-yellow-500', 'text-gray-400', 'text-orange-600', 'text-gray-500', 'text-gray-500'];
                return (
                  <div key={skill.id} className="flex items-center gap-3 group">
                    <span className={`w-6 text-center text-sm font-bold ${rankColors[i] || 'text-gray-500'}`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-full ml-2 shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Activité récente (simulée) */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
              activité
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-8 flex items-end gap-1">
                {Array.from({ length: 7 }, (_, i) => {
                  const h = ((daysSinceEpoch * (i + 1) * 7 + i * 13) % 24) + 4;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/30 to-primary/60 dark:from-primary/20 dark:to-primary/40"
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-gray-400 dark:text-gray-500">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ROW 3: MESSAGES RÉCENTS + ACTIONS RAPIDES ========== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* MESSAGES RÉCENTS */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages récents</h2>
            <Link
              href="/admin/contacts"
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Voir tout
            </Link>
          </div>

          <div className="space-y-3">
            {contactsRecent.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51" />
                </svg>
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">Aucun message reçu.</p>
              </div>
            ) : (
              contactsRecent.map((msg) => (
                <Link
                  key={msg.id}
                  href="/admin/contacts"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary uppercase">
                      {msg.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {msg.name}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0">
                        {timeAgo(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {msg.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mt-0.5">
                      {msg.message}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* ACTIONS RAPIDES */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Actions rapides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <QuickAction
              href="/admin/projects/create"
              gradient="from-primary to-purple-500"
              icon={<path d="M12 4v16m8-8H4" />}
              label="Nouveau projet"
              desc="Ajouter un projet"
            />
            <QuickAction
              href="/admin/skills/create"
              gradient="from-purple-500 to-pink-500"
              icon={<path d="M12 4v16m8-8H4" />}
              label="Nouvelle compétence"
              desc="Ajouter une compétence"
            />
            <QuickAction
              href="/admin/projects"
              gradient="from-cyan-500 to-blue-500"
              icon={<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
              label="Gérer les projets"
              desc="Modifier, supprimer"
            />
            <QuickAction
              href="/admin/skills"
              gradient="from-orange-500 to-red-500"
              icon={<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
              label="Gérer les compétences"
              desc="Mettre à jour les niveaux"
            />
            <QuickAction
              href="/admin/contacts"
              gradient="from-green-500 to-teal-500"
              icon={<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
              label="Messages reçus"
              desc="Lire et répondre"
            />
            <QuickAction
              href="/admin/settings"
              gradient="from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600"
              icon={<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
              label="Paramètres"
              desc="Personnaliser l'accueil"
            />
          </div>
        </div>
      </div>

      {/* ========== PIED DE TABLEAU ========== */}
      <div className="text-center pt-4">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Portfolio — Tableau de bord v2.0 · {projects} projet{projects !== 1 ? 's' : ''}, {skills} compétence{skills !== 1 ? 's' : ''}, {contacts} message{contacts !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

/* ===== COMPOSANTS ===== */

function StatCard({
  icon, value, label, gradient, iconBg, iconColor, href,
}: {
  icon: React.ReactNode; value: number; label: string; gradient: string; iconBg: string; iconColor: string; href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{ width: `${Math.min(100, value * (label === 'Messages' ? 15 : label === 'Catégories' ? 25 : 10))}%` }}
        />
      </div>
    </Link>
  );
}

function QuickAction({
  href, gradient, icon, label, desc,
}: {
  href: string; gradient: string; icon: React.ReactNode; label: string; desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-md"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform shadow-sm`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
          {label}
        </div>
        <div className="text-[11px] text-gray-500 dark:text-gray-400">{desc}</div>
      </div>
    </Link>
  );
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} j`;
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}
