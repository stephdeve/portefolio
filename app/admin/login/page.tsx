import { ThemeScript } from '@/components/ThemeScript';
import { config } from '@/lib/config';
import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Connexion Admin',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <ThemeScript storageKey="admin-theme" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-purple-500/10 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
        <div className="w-full max-w-md animate-slide-up">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-2xl mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connexion Admin</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Accédez à votre panneau d’administration{config.app.name ? ` — ${config.app.name}` : ''}
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
