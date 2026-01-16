<?php /** @var array<int, array<string,mixed>> $projects */ /** @var int $page */ /** @var int $pages */ /** @var string $search */ /** @var int $total */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="space-y-8 animate-fade-in">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Projets</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Gérez les projets de votre portfolio</p>
    </div>
    <a class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects/create">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
      Nouveau projet
    </a>
  </div>

  <form method="get" action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects" class="flex flex-col sm:flex-row gap-3">
    <div class="flex-1">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="search" name="search" value="<?= htmlspecialchars($search, ENT_QUOTES, 'UTF-8') ?>" placeholder="Rechercher titre ou description…" />
      </div>
    </div>
    <button class="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" type="submit">Rechercher</button>
    <?php if ($search !== ''): ?>
      <a class="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects">Effacer</a>
    <?php endif; ?>
  </form>

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

  <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <?= (int)$total ?> projet<?= $total > 1 ? 's' : '' ?> trouvé<?= $total > 1 ? 's' : '' ?><?php if ($search !== ''): ?> pour « <?= htmlspecialchars($search, ENT_QUOTES, 'UTF-8') ?> »<?php endif; ?>
        </div>
        <?php if ($pages > 1): ?>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Page <?= (int)$page ?> sur <?= (int)$pages ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Titre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stack</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <?php foreach ($projects as $p): ?>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"><?= (int)$p['id'] ?></td>
              <td class="px-6 py-4 whitespace-nowrap">
                <?php if (!empty($p['image'])): ?>
                  <?php
                    $admImg = (string)($p['image'] ?? '');
                    $admImgFallback = preg_replace('/_resized\.[^.]+$/', '_thumb.jpg', $admImg) ?: $admImg;
                  ?>
                  <img class="h-12 w-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700" src="<?= htmlspecialchars($base . '/' . $admImg, ENT_QUOTES, 'UTF-8') ?>" onerror="this.onerror=null; this.src='<?= htmlspecialchars($base . '/' . $admImgFallback, ENT_QUOTES, 'UTF-8') ?>'" alt="Miniature" />
                <?php else: ?>
                  <div class="h-12 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                <?php endif; ?>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white"><?= htmlspecialchars($p['title'], ENT_QUOTES, 'UTF-8') ?></div>
                <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs"><?= htmlspecialchars($p['description'], ENT_QUOTES, 'UTF-8') ?></div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <?php foreach (($p['stack'] ?? []) as $tag): ?>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      <?= htmlspecialchars($tag, ENT_QUOTES, 'UTF-8') ?>
                    </span>
                  <?php endforeach; ?>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <a class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects/edit?id=<?= (int)$p['id'] ?>">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    Éditer
                  </a>
                  <form method="post" action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects/delete" onsubmit="return confirm('Supprimer ce projet ? Cette action est irréversible.');" class="inline">
                    <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
                    <input type="hidden" name="id" value="<?= (int)$p['id'] ?>" />
                    <button class="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="submit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      Supprimer
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>

  <?php if ($pages > 1): ?>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Affichage de <?= min((($page - 1) * 15 + 1), $total) ?> à <?= min($page * 15, $total) ?> sur <?= (int)$total ?> résultats
      </div>
      <div class="flex items-center gap-2">
        <?php if ($page > 1): ?>
          <a class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="?page=<?= $page - 1 ?><?php if ($search !== '') echo '&search=' . urlencode($search); ?>">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            Précédent
          </a>
        <?php endif; ?>
        <?php
        $start = max(1, $page - 2);
        $end = min($pages, $page + 2);
        for ($i = $start; $i <= $end; $i++):
        ?>
          <?php if ($i === $page): ?>
            <span class="px-3 py-2 rounded-lg bg-primary text-white font-medium"><?= (int)$i ?></span>
          <?php else: ?>
            <a class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="?page=<?= $i ?><?php if ($search !== '') echo '&search=' . urlencode($search); ?>"><?= (int)$i ?></a>
          <?php endif; ?>
        <?php endfor; ?>
        <?php if ($page < $pages): ?>
          <a class="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="?page=<?= $page + 1 ?><?php if ($search !== '') echo '&search=' . urlencode($search); ?>">
            Suivant
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </a>
        <?php endif; ?>
      </div>
    </div>
  <?php endif; ?>
</div>
