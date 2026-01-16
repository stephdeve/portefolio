<?php /** @var array{id:int|null,name:string,level:int} $skill */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="max-w-2xl animate-slide-up">
  <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        <?= $skill['id'] ? 'Modifier la compétence' : 'Nouvelle compétence' ?>
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        <?= $skill['id'] ? 'Mettez à jour la compétence.' : 'Ajoutez une nouvelle compétence technique.' ?>
      </p>
    </div>
    <form action="<?= htmlspecialchars($base . '/admin/skills' . ($skill['id'] ? '/update' : ''), ENT_QUOTES, 'UTF-8') ?>" method="post" class="p-6 space-y-6">
      <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
      <?php if ($skill['id']): ?>
        <input type="hidden" name="id" value="<?= (int)$skill['id'] ?>" />
      <?php endif; ?>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="name">Nom de la compétence</label>
        <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="name" id="name" value="<?= htmlspecialchars($skill['name'], ENT_QUOTES, 'UTF-8') ?>" required placeholder="Ex: PHP, JavaScript, MySQL..." />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="level">Niveau de maîtrise</label>
        <div class="space-y-3">
          <div class="flex items-center gap-4">
            <input class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="number" name="level" id="level" value="<?= (int)$skill['level'] ?>" min="0" max="100" required />
            <span class="text-2xl font-bold text-primary"><?= (int)$skill['level'] ?>%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div id="levelPreview" class="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-300" style="width: <?= (int)$skill['level'] ?>%"></div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 pt-4">
        <button type="submit" class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          <?= $skill['id'] ? 'Mettre à jour' : 'Créer' ?>
        </button>
        <a class="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base . '/admin/skills', ENT_QUOTES, 'UTF-8') ?>">Annuler</a>
      </div>
    </form>
  </div>
</div>

<script>
document.getElementById('level')?.addEventListener('input', function(e) {
  const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
  document.getElementById('levelPreview').style.width = value + '%';
  document.querySelector('.text-2xl.font-bold.text-primary').textContent = value + '%';
});
</script>
