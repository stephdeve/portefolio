'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logoutAction } from '@/app/admin/auth-actions';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/projects', label: 'Projets', exact: false },
  { href: '/admin/skills', label: 'Compétences', exact: false },
  { href: '/admin/contacts', label: 'Contacts', exact: false },
  { href: '/admin/settings', label: 'Paramètres', exact: false },
];

function active(pathname: string, href: string, exact: boolean) {
  return exact ? pathname === href || pathname === `${href}/` : pathname.startsWith(href);
}

const LogoutButton = ({ mobile = false }: { mobile?: boolean }) => (
  <form action={logoutAction} className={mobile ? '' : ''}>
    <button
      type="submit"
      className={`${mobile ? 'w-full justify-center' : ''} inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Déconnexion
    </button>
  </form>
);

export function AdminHeader({ appName }: { appName: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    localStorage.setItem('admin-theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Admin
                </h1>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">·</span>
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">{appName}</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <nav className="hidden sm:flex flex-1 items-center gap-2 md:gap-3 lg:gap-4 overflow-x-auto whitespace-nowrap">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${active(pathname, item.href, item.exact) ? 'text-primary font-semibold' : ''}`}
                    href={item.href}
                    aria-current={active(pathname, item.href, item.exact) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                <LogoutButton />
              </nav>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Basculer le thème"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95 5.636 18.364" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${active(pathname, item.href, item.exact) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
              <LogoutButton mobile />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
