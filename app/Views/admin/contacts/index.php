<?php /** @var array<int, array<string,mixed>> $contacts */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="space-y-8 animate-fade-in">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Messages de contact</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Consultez et gérez les messages reçus</p>
    </div>
  </div>

  <?php if (!empty($success)): ?>
    <div class="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 animate-slide-up">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span><?= htmlspecialchars($success, ENT_QUOTES, 'UTF-8') ?></span>
      </div>
    </div>
  <?php endif; ?>
  <?php if (!empty($error)): ?>
    <div class="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 animate-slide-up">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
        <span><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></span>
      </div>
    </div>
  <?php endif; ?>

  <?php if (empty($contacts)): ?>
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 text-center">
      <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun message</h3>
      <p class="text-gray-600 dark:text-gray-400">Vous n'avez pas encore reçu de message de contact.</p>
    </div>
  <?php else: ?>
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <?= count($contacts) ?> message<?= count($contacts) > 1 ? 's' : '' ?> reçu<?= count($contacts) > 1 ? 's' : '' ?>
        </div>
      </div>
      <div class="divide-y divide-gray-200 dark:divide-gray-800">
        <?php foreach ($contacts as $contact): ?>
          <div class="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white"><?= htmlspecialchars($contact['name'], ENT_QUOTES, 'UTF-8') ?></h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400"><?= htmlspecialchars($contact['email'], ENT_QUOTES, 'UTF-8') ?></p>
                  </div>
                </div>
                <div class="text-gray-700 dark:text-gray-300 mb-3">
                  <?= nl2br(htmlspecialchars($contact['message'], ENT_QUOTES, 'UTF-8')) ?>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Reçu le <?= date('d/m/Y à H:i', strtotime($contact['created_at'])) ?>
                </div>
              </div>
              <form method="post" action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/contacts/delete" onsubmit="return confirm('Supprimer ce message ? Cette action est irréversible.');" class="flex-shrink-0">
                <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
                <input type="hidden" name="id" value="<?= (int)$contact['id'] ?>" />
                <button class="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="submit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </form>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>
</div>
