import Link from 'next/link';
import { getSetting } from '@/lib/data';
import { assetUrl } from '@/lib/url';
import { FallbackImage } from '@/components/ProfileImage';

export const metadata = {
  title: 'Développeur Web & Mobile - Portfolio',
  description: "Portfolio d’un développeur web et mobile spécialisé Cloud & DevOps : projets, compétences et contact.",
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [profileImage, imageAltRaw] = await Promise.all([
    getSetting('home.profile_image'),
    getSetting('home.profile_image_alt'),
  ]);
  const imageAlt = imageAltRaw || 'Photo professionnelle';
  // Use the uploaded image (Vercel Blob) if set, otherwise the shipped default.
  const imgSrc = profileImage ? assetUrl(profileImage) : '/assets/images/profile.jpg';

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Backend-first • Web • Mobile • DevOps
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Développeur polyvalent
                </span>
                <br />
                orienté backend, mobile &amp; DevOps
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Je conçois des APIs performantes, des architectures fiables et des déploiements automatisés.
                Mon focus est le backend, avec une vision produit web &amp; mobile et une culture DevOps.
              </p>
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
                    Stéphane Steven TOSSOUGBE
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Développeur backend • Web • Mobile • DevOps
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    ['5+', "Ans d'expérience"],
                    ['50+', 'Projets livrés'],
                    ['15+', 'Technologies'],
                    ['100%', 'Satisfaction'],
                  ].map(([value, label]) => (
                    <div className="text-center" key={label}>
                      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
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
              Qui suis-je ?
            </h2>
          </div>

          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
            <p>
              Je suis développeur web et mobile, passionné par la conception de solutions numériques complètes et évolutives. J&apos;interviens aussi sur les environnements Cloud Computing et DevOps, avec une forte orientation vers l&apos;automatisation, la performance et la scalabilité des applications.
            </p>
            <p>
              J&apos;aime transformer des idées en produits concrets : applications web, plateformes mobiles et systèmes cloud bien architecturés. Mon approche repose sur une vision globale du développement, allant de la conception logicielle jusqu&apos;au déploiement en production.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70 dark:text-primary/50 mb-4">
              Je m&apos;intéresse particulièrement à
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', label: "Architectures modernes et maintenables" },
                { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: "API robustes et sécurisées" },
                { icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', label: "Déploiement cloud et conteneurisation" },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: "Optimisation des systèmes et performances" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-500 italic text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Toujours en apprentissage, j&apos;évolue en continu pour maîtriser les technologies les plus pertinentes et construire des solutions fiables, modernes et prêtes pour le futur.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 my-16">
        <figure className="text-center animate-fade-in">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />
          <blockquote className="text-3xl md:text-4xl italic font-semibold">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              « Le code est une poésie qui transforme l&apos;imagination en une réalité »
            </span>
          </blockquote>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-6" />
        </figure>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl my-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que j&apos;apporte</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Du backend solide, des apps web &amp; mobile de qualité, et des déploiements maîtrisés.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 7h18M3 12h12M3 17h18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Backend solide</h3>
            <p className="text-gray-600 dark:text-gray-400">
              APIs fiables, sécurité, performance et robustesse orientées produit.
            </p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM12 18h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Web &amp; Mobile</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Expérience cohérente du web au mobile, centrée sur l&apos;utilisateur.
            </p>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 13h18M12 3v18M8 21h8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">DevOps &amp; CI/CD</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatisation, déploiements fiables, observabilité et cloud-ready.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
