import { ThemeScript } from '@/components/ThemeScript';
import { AdminHeader } from '@/components/AdminHeader';
import { config } from '@/lib/config';
import { requireAdmin } from '@/lib/server-auth';

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen">
      <ThemeScript storageKey="admin-theme" />
      <AdminHeader appName={config.app.name} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">{children}</main>
    </div>
  );
}
