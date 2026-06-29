import { getSetting } from '@/lib/data';
import { assetUrl } from '@/lib/url';
import { Flash } from '@/components/admin/Flash';
import { FallbackImage } from '@/components/ProfileImage';
import { updateProfileImage, updateHomeContent } from './actions';

export const metadata = { title: 'Paramètres' };
export const dynamic = 'force-dynamic';

function s(v: string | null, fallback = ''): string {
  return v ?? fallback;
}

function parseJSON<T>(v: string | null, fallback: T): T {
  if (!v) return fallback;
  try { return JSON.parse(v) as T; } catch { return fallback; }
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
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
    'home.social_links',
  ];
  for (const k of keys) {
    settings[k] = await getSetting(k);
  }

  const previewSrc = settings['home.profile_image']
    ? assetUrl(settings['home.profile_image'])
    : '/assets/images/profile.jpg';

  const defaultInterests = [
    { label: 'Architectures modernes et maintenables' },
    { label: 'API robustes et sécurisées' },
    { label: 'Déploiement cloud et conteneurisation' },
    { label: 'Optimisation des systèmes et performances' },
  ];
  const interests = parseJSON<{ label: string }[]>(settings['home.about_interests'], defaultInterests);

  const defaultOfferItems = [
    { title: 'Backend solide', description: 'APIs fiables, sécurité, performance et robustesse orientées produit.' },
    { title: 'Web & Mobile', description: 'Expérience cohérente du web au mobile, centrée sur l\'utilisateur.' },
    { title: 'DevOps & CI/CD', description: 'Automatisation, déploiements fiables, observabilité et cloud-ready.' },
  ];
  const offerItems = parseJSON<{ title: string; description: string }[]>(settings['home.offer_items'], defaultOfferItems);

  const defaultStats = [
    { number: '5+', label: "Ans d'expérience" },
    { number: '50+', label: 'Projets livrés' },
    { number: '15+', label: 'Technologies' },
    { number: '100%', label: 'Satisfaction' },
  ];
  const stats = parseJSON<{ number: string; label: string }[]>(settings['home.stats'], defaultStats);

  const defaultSocialLinks = { github: '', linkedin: '', twitter: '', facebook: '', whatsapp: '' };
  const socialLinks = parseJSON<Record<string, string>>(settings['home.social_links'], defaultSocialLinks);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Flash ok={searchParams.ok} err={searchParams.err} />

      <h2 className="text-2xl font-bold">Paramètres de la page d&apos;accueil</h2>

      {/* ===== PHOTO DE PROFIL ===== */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Photo de profil</h3>
        <div className="flex items-start gap-6">
          <div className="w-40 shrink-0">
            <div className="aspect-square w-40 h-40 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow bg-gradient-to-br from-primary/20 to-purple-500/20">
              <FallbackImage
                className="w-full h-full object-cover"
                src={previewSrc}
                alt={s(settings['home.profile_image_alt'], 'Photo')}
              />
            </div>
          </div>
          <form className="flex-1 space-y-4" action={updateProfileImage}>
            <div>
              <label className="block text-sm font-medium mb-1">Image (JPG/PNG/WebP/GIF, max 2 Mo)</label>
              <input
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                type="file"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Texte alternatif (accessibilité)</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text"
                name="image_alt"
                defaultValue={s(settings['home.profile_image_alt'])}
                placeholder="Ex: Portrait professionnel"
              />
            </div>
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== FORMULAIRE CONTENU ===== */}
      <form action={updateHomeContent} className="space-y-6">
        {/* HERO */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Section Héro</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Badge</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.hero_badge"
                defaultValue={s(settings['home.hero_badge'], 'Web • Mobile • Cloud • DevOps')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Titre (ligne 1 — dégradé)</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.hero_title_line1"
                defaultValue={s(settings['home.hero_title_line1'], 'Développeur web et mobile,')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Titre (ligne 2)</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.hero_title_line2"
                defaultValue={s(settings['home.hero_title_line2'], 'ingénieur en Cloud Computing & DevOps')}
              />
            </div>
          </div>
        </section>

        {/* PROFIL */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Carte de profil</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom affiché</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.profile_name"
                defaultValue={s(settings['home.profile_name'], 'Stéphane Steven TOSSOUGBE')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Titre / sous-titre</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.profile_title"
                defaultValue={s(settings['home.profile_title'], 'Développeur Web & Mobile • Cloud & DevOps')}
              />
            </div>
          </div>
        </section>

        {/* QUI SUIS-JE */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Section « Qui suis-je ? »</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre de la section</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.about_title"
                defaultValue={s(settings['home.about_title'], 'Qui suis-je ?')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Texte de présentation</label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                name="home.about_text"
                defaultValue={s(settings['home.about_text'], 'Développeur web et mobile, orienté Cloud Computing & DevOps, spécialisé dans la conception d\'applications modernes, le développement d\'API et le déploiement cloud. Passionné par l\'architecture logicielle et l\'automatisation des systèmes, je construis des solutions évolutives et performantes.')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Titre des centres d&apos;intérêt</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.about_interests_heading"
                defaultValue={s(settings['home.about_interests_heading'], 'Je m\'intéresse particulièrement à')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Centres d&apos;intérêt</label>
              {interests.map((item, i) => (
                <input key={i}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="text" name={`home.about_interest_${i}`}
                  defaultValue={item.label}
                  placeholder={`Intérêt ${i + 1}`}
                />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pied de section (texte d&apos;apprentissage)</label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                name="home.about_footer"
                defaultValue={s(settings['home.about_footer'], 'Toujours en apprentissage, j\'évolue en continu pour maîtriser les technologies les plus pertinentes et construire des solutions fiables, modernes et prêtes pour le futur.')}
              />
            </div>
          </div>
        </section>

        {/* CITATION */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Citation</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Texte de la citation</label>
            <input
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              type="text" name="home.quote_text"
              defaultValue={s(settings['home.quote_text'], '« Le code est une poésie qui transforme l\'imagination en une réalité »')}
            />
          </div>
        </section>

        {/* CE QUE J'APPORTE */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Section « Ce que j&apos;apporte »</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.offer_title"
                defaultValue={s(settings['home.offer_title'], 'Ce que j\'apporte')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sous-titre</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.offer_subtitle"
                defaultValue={s(settings['home.offer_subtitle'], 'Du backend solide, des apps web & mobile de qualité, et des déploiements maîtrisés.')}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-1">Éléments</label>
              {offerItems.map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Élément {i + 1}</span>
                  <input
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    type="text" name={`home.offer_item_${i}_title`}
                    defaultValue={item.title}
                    placeholder="Titre"
                  />
                  <textarea
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                    name={`home.offer_item_${i}_desc`}
                    defaultValue={item.description}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTIQUES */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Statistiques (carte de profil)</h3>
          <div className="space-y-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="w-24 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="text" name={`home.stat_${i}_number`}
                  defaultValue={stat.number}
                  placeholder="Nombre"
                />
                <input
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  type="text" name={`home.stat_${i}_label`}
                  defaultValue={stat.label}
                  placeholder="Libellé"
                />
              </div>
            ))}
          </div>
        </section>

        {/* RÉSEAUX SOCIAUX */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Réseaux sociaux (affichés sur l&apos;accueil)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="url" name="home.social_github" defaultValue={socialLinks.github || ''} placeholder="https://github.com/username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="url" name="home.social_linkedin" defaultValue={socialLinks.linkedin || ''} placeholder="https://linkedin.com/in/username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Twitter / X</label>
              <input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="url" name="home.social_twitter" defaultValue={socialLinks.twitter || ''} placeholder="https://twitter.com/username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="url" name="home.social_facebook" defaultValue={socialLinks.facebook || ''} placeholder="https://facebook.com/username" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp</label>
              <input className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="url" name="home.social_whatsapp" defaultValue={socialLinks.whatsapp || ''} placeholder="https://wa.me/..." />
            </div>
          </div>
        </section>

        {/* META */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">SEO / Métadonnées</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre (balise title)</label>
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="text" name="home.meta_title"
                defaultValue={s(settings['home.meta_title'], 'Développeur Web & Mobile - Portfolio')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (balise meta)</label>
              <textarea
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]"
                name="home.meta_description"
                defaultValue={s(settings['home.meta_description'], "Portfolio d'un développeur web et mobile spécialisé Cloud & DevOps : projets, compétences et contact.")}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end pb-8">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:opacity-90 transition shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Enregistrer tous les paramètres
          </button>
        </div>
      </form>
    </div>
  );
}
