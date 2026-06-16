import Link from 'next/link';

export function Footer({ appName }: { appName: string }) {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <p>
          © {new Date().getFullYear()} {appName}. Tous droits réservés.
        </p>
        <div className="flex items-center justify-center md:justify-end gap-4">
          <Link className="hover:text-primary" href="/projects">
            Projets
          </Link>
          <Link className="hover:text-primary" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
