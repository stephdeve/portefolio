import Link from 'next/link';
import { getSetting } from '@/lib/data';
import { assetUrl } from '@/lib/url';
import { FallbackImage } from '@/components/ProfileImage';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const title = await getSetting('home.meta_title');
  const description = await getSetting('home.meta_description');
  return {
    title: title ?? 'Développeur Web & Mobile - Portfolio',
    description: description ?? "Portfolio d'un développeur web et mobile spécialisé Cloud & DevOps : projets, compétences et contact.",
  };
}

function s(v: string | null, fallback: string): string {
  return v ?? fallback;
}

function parseJSON<T>(v: string | null, fallback: T): T {
  if (!v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const settings: Record<string, string | null> = {};
  const keys = [
    'home.profile_image',
    'home.profile_image_alt',
    'home.hero_badge',
    'home.hero_title_line1',
    'home.hero_title_line2',
    'home.profile_name',
    'home.profile_title',
    'home.about_title',
    'home.about_text',
    'home.about_interests_heading',
    'home.about_interests',
    'home.about_footer',
    'home.quote_text',
    'home.offer_title',
    'home.offer_subtitle',
    'home.offer_items',
    'home.stats',
    'home.meta_title',
    'home.meta_description',
  ];
  for (const k of keys) {
    settings[k] = await getSetting(k);
  }

  const heroBadge = s(settings['home.hero_badge'], 'Web • Mobile • Cloud • DevOps');
  const heroLine1 = s(settings['home.hero_title_line1'], 'Développeur web et mobile,');
  const heroLine2 = s(settings['home.hero_title_line2'], 'ingénieur en Cloud Computing & DevOps');
  const profileName = s(settings['home.profile_name'], 'Stéphane Steven TOSSOUGBE');
  const profileTitle = s(settings['home.profile_title'], 'Développeur Web & Mobile • Cloud & DevOps');
  const aboutTitle = s(settings['home.about_title'], 'Qui suis-je ?');
  const aboutText = s(settings['home.about_text'], '');
  const aboutInterestsHeading = s(settings['home.about_interests_heading'], 'Je m\'intéresse particulièrement à');
  const aboutInterests = parseJSON<{ icon?: string; label: string }[]>(settings['home.about_interests'], [
    { label: 'Architectures modernes et maintenables' },
    { label: 'API robustes et sécurisées' },
    { label: 'Déploiement cloud et conteneurisation' },
    { label: 'Optimisation des systèmes et performances' },
  ]);
  const aboutFooter = s(settings['home.about_footer'], '');
  const quoteText = s(settings['home.quote_text'], '« Le code est une poésie qui transforme l\'imagination en une réalité »');
  const offerTitle = s(settings['home.offer_title'], 'Ce que j\'apporte');
  const offerSubtitle = s(settings['home.offer_subtitle'], '');
  const offerItems = parseJSON<{ title: string; description: string }[]>(settings['home.offer_items'], [
    { title: 'Backend solide', description: 'APIs fiables, sécurité, performance et robustesse orientées produit.' },
    { title: 'Web & Mobile', description: 'Expérience cohérente du web au mobile, centrée sur l\'utilisateur.' },
    { title: 'DevOps & CI/CD', description: 'Automatisation, déploiements fiables, observabilité et cloud-ready.' },
  ]);
  const stats = parseJSON<{ number: string; label: string }[]>(settings['home.stats'], [
    { number: '5+', label: "Ans d'expérience" },
    { number: '50+', label: 'Projets livrés' },
    { number: '15+', label: 'Technologies' },
    { number: '100%', label: 'Satisfaction' },
  ]);

  const imageAlt = s(settings['home.profile_image_alt'], 'Photo professionnelle');
  const imgSrc = settings['home.profile_image']
    ? assetUrl(settings['home.profile_image'])
    : '/assets/images/profile.jpg';

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {heroBadge}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {heroLine1}
                </span>
                <br />
                {heroLine2}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  href="/projects"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Voir mes projets
                </Link>
                <Link
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  href="/contact"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Me contacter
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl transform rotate-6" />
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="relative mb-6">
                  <div className="aspect-square w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <FallbackImage className="w-full h-full object-cover" src={imgSrc} alt={imageAlt} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center space-y-1 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profileName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profileTitle}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div className="text-center" key={stat.label}>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUI SUIS-JE ? ========== */}
      <section className="max-w-6xl mx-auto px-4 py-16 my-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {aboutTitle}
            </h2>
          </div>

          {aboutText && (
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              <p>{aboutText}</p>
            </div>
          )}

          {aboutInterests.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70 dark:text-primary/50 mb-4">
                {aboutInterestsHeading}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {aboutInterests.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aboutFooter && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-500 italic text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {aboutFooter}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CITATION ========== */}
      <section className="max-w-4xl mx-auto px-4 my-16">
        <figure className="text-center animate-fade-in">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />
          <blockquote className="text-3xl md:text-4xl italic font-semibold">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {quoteText}
            </span>
          </blockquote>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-6" />
        </figure>
      </section>

      {/* ========== CE QUE J'APPORTE ========== */}
      {offerItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl my-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{offerTitle}</h2>
            {offerSubtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400">{offerSubtitle}</p>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {offerItems.map((item, i) => (
              <div key={item.title} className="text-center animate-slide-up" style={{ animationDelay: `${(i + 1) * 0.1}s` } as React.CSSProperties}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d={['M3 7h18M3 12h12M3 17h18', 'M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM12 18h.01', 'M3 13h18M12 3v18M8 21h8'][i] || 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
