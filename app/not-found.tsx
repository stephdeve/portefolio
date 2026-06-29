import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeScript } from '@/components/ThemeScript';
import { config } from '@/lib/config';

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false },
};

export default function NotFound() {
  const appName = config.app.name;
  return (
    <>
      <ThemeScript storageKey="theme" />
      <Header appName={appName} />
      <main className="min-h-[70vh]">
        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div>
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">La page demandée est introuvable.</p>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-3 rounded-md bg-primary text-white hover:opacity-90 transition"
            >
              Retour à l’accueil
            </Link>
          </div>
        </section>
      </main>
      <Footer appName={appName} />
    </>
  );
}
