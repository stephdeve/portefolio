import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeScript } from '@/components/ThemeScript';
import { config } from '@/lib/config';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const appName = config.app.name;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.owner.name || appName,
    url: config.app.baseUrl,
    jobTitle: config.owner.headline || 'Développeur Web & Mobile • Cloud & DevOps',
    description: config.app.description,
  };

  return (
    <>
      <ThemeScript storageKey="theme" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <Header appName={appName} />
      <main id="main-content" className="min-h-[70vh]">{children}</main>
      <Footer appName={appName} />
    </>
  );
}
