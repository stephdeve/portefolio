import { config } from '@/lib/config';
import { GITHUB_ICON, LINKEDIN_ICON, TWITTER_ICON, FACEBOOK_ICON, WHATSAPP_ICON } from '@/lib/icons';
import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Me contacter pour une collaboration ou une opportunité.',
};

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  github: GITHUB_ICON,
  linkedin: LINKEDIN_ICON,
  twitter: TWITTER_ICON,
  facebook: FACEBOOK_ICON,
  whatsapp: WHATSAPP_ICON,
};

export default function ContactPage() {
  const owner = config.owner;
  const socials: [string, string][] = [
    ['github', owner.github],
    ['linkedin', owner.linkedin],
    ['twitter', owner.twitter],
    ['facebook', owner.facebook],
    ['whatsapp', owner.whatsapp],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactez-moi
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Parlons de votre{' '}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                projet
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Vous avez une idée en tête ? Un projet à réaliser ? N&apos;hésitez pas à me contacter
              pour discuter de vos besoins.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Informations de contact
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Email</div>
                      <div className="text-gray-600 dark:text-gray-400">{owner.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Localisation</div>
                      <div className="text-gray-600 dark:text-gray-400">{owner.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Disponibilité</div>
                      <div className="text-gray-600 dark:text-gray-400">{owner.availability}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Réseaux sociaux
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socials
                    .filter(([, url]) => url)
                    .map(([key, url]) => (
                      <a
                        key={key}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          {SOCIAL_ICONS[key]}
                        </svg>
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
