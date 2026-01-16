<?php /** @var array<int, array<string,mixed>> $skills */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="space-y-8 animate-fade-in">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Compétences</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Gérez vos compétences techniques</p>
    </div>
    <a class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/skills/create">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
      Nouvelle compétence
    </a>
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

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <?php foreach ($skills as $skill): ?>
      <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><?= htmlspecialchars($skill['name'], ENT_QUOTES, 'UTF-8') ?></h3>
            <span class="text-2xl font-bold text-primary"><?= (int)$skill['level'] ?>%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div class="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out animate-fade-in" style="width: <?= (int)$skill['level'] ?>%"></div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Niveau de maîtrise</span>
            <div class="flex items-center gap-2">
              <a class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/skills/edit?id=<?= (int)$skill['id'] ?>">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                Éditer
              </a>
              <form method="post" action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/skills/delete" onsubmit="return confirm('Supprimer cette compétence ? Cette action est irréversible.');" class="inline">
                <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
                <input type="hidden" name="id" value="<?= (int)$skill['id'] ?>" />
                <button class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="submit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>
