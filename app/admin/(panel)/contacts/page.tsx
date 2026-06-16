import { prisma } from '@/lib/prisma';
import { Flash } from '@/components/admin/Flash';
import { DeleteForm } from '@/components/admin/DeleteForm';
import { deleteContact } from './actions';

export const metadata = { title: 'Messages de contact' };
export const dynamic = 'force-dynamic';

function formatDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} à ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: { ok?: string; err?: string };
}) {
  const contacts = await prisma.contact.findMany({ orderBy: { id: 'desc' } });
  const count = contacts.length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages de contact</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Consultez et gérez les messages reçus</p>
        </div>
      </div>

      <Flash ok={searchParams.ok} err={searchParams.err} />

      {count === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun message</h3>
          <p className="text-gray-600 dark:text-gray-400">Vous n&apos;avez pas encore reçu de message de contact.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {count} message{count > 1 ? 's' : ''} reçu{count > 1 ? 's' : ''}
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
                      </div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">{contact.message}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Reçu le {formatDate(contact.createdAt)}
                    </div>
                  </div>
                  <DeleteForm
                    action={deleteContact}
                    id={contact.id}
                    confirmMessage="Supprimer ce message ? Cette action est irréversible."
                    formClassName="flex-shrink-0"
                    className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </DeleteForm>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
