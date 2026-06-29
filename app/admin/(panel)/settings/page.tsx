import { getSetting } from '@/lib/data';
import { assetUrl } from '@/lib/url';
import { Flash } from '@/components/admin/Flash';
import { FallbackImage } from '@/components/ProfileImage';
import { updateProfileImage } from './actions';

export const metadata = { title: 'Paramètres' };
export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const profileImage = await getSetting('home.profile_image');
  const profileImageAlt = await getSetting('home.profile_image_alt');
  const previewSrc = profileImage ? assetUrl(profileImage) : '/assets/images/profile.jpg';

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Flash ok={searchParams.ok} err={searchParams.err} />

      <h2 className="text-2xl font-bold mb-6">Paramètres de la page d&apos;accueil</h2>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Photo de profil (Accueil)</h3>

        <div className="flex items-start gap-6">
          <div className="w-40">
            <div className="aspect-square w-40 h-40 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow bg-gradient-to-br from-primary/20 to-purple-500/20">
              <FallbackImage
                className="w-full h-full object-cover"
                src={previewSrc}
                alt={profileImageAlt || 'Photo professionnelle'}
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
                defaultValue={profileImageAlt ?? ''}
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
      </div>
    </div>
  );
}
