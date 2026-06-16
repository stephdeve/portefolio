import Link from 'next/link';
import { getProjectsPaginated } from '@/lib/data';
import { Flash } from '@/components/admin/Flash';
import { DeleteForm } from '@/components/admin/DeleteForm';
import { FallbackImage } from '@/components/ProfileImage';
import { deleteProject } from './actions';

export const metadata = { title: 'Projets' };
export const dynamic = 'force-dynamic';

const PER_PAGE = 15;

function pageHref(p: number, search: string): string {
  const params = new URLSearchParams();
  params.set('page', String(p));
  if (search) params.set('search', search);
  return `/admin/projects?${params.toString()}`;
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; ok?: string; err?: string };
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? '1', 10) || 1);
  const search = (searchParams.search ?? '').trim();
  const { projects, total } = await getProjectsPaginated(page, PER_PAGE, search || null);
  const pages = Math.ceil(total / PER_PAGE);
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, page + 2);
  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gérez les projets de votre portfolio</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
          href="/admin/projects/create"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" />
          </svg>
          Nouveau projet
        </Link>
      </div>

      <form method="get" action="/admin/projects" className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Rechercher titre ou description…"
            />
          </div>
        </div>
        <button className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" type="submit">
          Rechercher
        </button>
        {search !== '' && (
          <Link className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="/admin/projects">
            Effacer
          </Link>
        )}
      </form>

      <Flash ok={searchParams.ok} err={searchParams.err} />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {total} projet{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
              {search !== '' && <> pour « {search} »</>}
            </div>
            {pages > 1 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} sur {pages}
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {['ID', 'Image', 'Titre', 'Stack', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {projects.map((p) => {
                const fallback = p.image ? p.image.replace(/_resized\.[^.]+$/, '_thumb.jpg') : '';
                return (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{p.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.image ? (
                        <FallbackImage
                          className="h-12 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                          src={`/${p.image}`}
                          fallbackSrc={`/${fallback}`}
                          alt="Miniature"
                        />
                      ) : (
                        <div className="h-12 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{p.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.stack.map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          href={`/admin/projects/edit?id=${p.id}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Éditer
                        </Link>
                        <DeleteForm
                          action={deleteProject}
                          id={p.id}
                          confirmMessage="Supprimer ce projet ? Cette action est irréversible."
                          formClassName="inline"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Supprimer
                        </DeleteForm>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Affichage de {Math.min((page - 1) * PER_PAGE + 1, total)} à {Math.min(page * PER_PAGE, total)} sur {total} résultats
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href={pageHref(page - 1, search)}>
                Précédent
              </Link>
            )}
            {pageNumbers.map((i) =>
              i === page ? (
                <span key={i} className="px-3 py-2 rounded-lg bg-primary text-white font-medium">
                  {i}
                </span>
              ) : (
                <Link key={i} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href={pageHref(i, search)}>
                  {i}
                </Link>
              ),
            )}
            {page < pages && (
              <Link className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href={pageHref(page + 1, search)}>
                Suivant
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
