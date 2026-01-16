<?php /** @var array{id:int|null,title:string,stack:array<string>,description:string,github:string,link:string,image:string|null,image_alt:string|null} $project */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="max-w-3xl animate-slide-up">
  <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        <?= $project['id'] ? 'Modifier le projet' : 'Nouveau projet' ?>
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        <?= $project['id'] ? 'Mettez à jour les informations du projet.' : 'Ajoutez un nouveau projet à votre portfolio.' ?>
      </p>
    </div>
    <form action="<?= htmlspecialchars($base . '/admin/projects' . ($project['id'] ? '/update' : ''), ENT_QUOTES, 'UTF-8') ?>" method="post" enctype="multipart/form-data" class="p-6 space-y-6">
      <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
      <?php if ($project['id']): ?>
        <input type="hidden" name="id" value="<?= (int)$project['id'] ?>" />
      <?php endif; ?>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="title">Titre</label>
          <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="title" id="title" value="<?= htmlspecialchars($project['title'], ENT_QUOTES, 'UTF-8') ?>" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="github">GitHub</label>
          <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="url" name="github" id="github" value="<?= htmlspecialchars($project['github'], ENT_QUOTES, 'UTF-8') ?>" placeholder="https://github.com/..." />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="link">Lien du projet</label>
        <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="url" name="link" id="link" value="<?= htmlspecialchars($project['link'], ENT_QUOTES, 'UTF-8') ?>" placeholder="https://example.com" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="description">Description</label>
        <textarea class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" name="description" id="description" rows="4"><?= htmlspecialchars($project['description'], ENT_QUOTES, 'UTF-8') ?></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stack technique</label>
        <div class="space-y-2">
          <?php foreach ($project['stack'] as $i => $tech): ?>
            <div class="flex gap-2">
              <input class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="stack[]" value="<?= htmlspecialchars($tech, ENT_QUOTES, 'UTF-8') ?>" placeholder="Ex: PHP, JavaScript..." />
              <button type="button" class="px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" onclick="this.parentElement.remove()">Supprimer</button>
            </div>
          <?php endforeach; ?>
          <button type="button" class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onclick="addTechField(this)">+ Ajouter une technologie</button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image de couverture</label>
          <div class="space-y-3">
            <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition" type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" />
            <p class="text-sm text-gray-500 dark:text-gray-400">Formats : JPEG, PNG, WebP, GIF • Max 2 Mo</p>
            <?php if (!empty($project['image'])): ?>
              <div class="relative group">
                <?php
                  $admPrev = (string)($project['image'] ?? '');
                  $admPrevFallback = preg_replace('/_resized\.[^.]+$/', '_thumb.jpg', $admPrev) ?: $admPrev;
                ?>
                <img class="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-800" src="<?= htmlspecialchars($base . '/' . $admPrev, ENT_QUOTES, 'UTF-8') ?>" onerror="this.onerror=null; this.src='<?= htmlspecialchars($base . '/' . $admPrevFallback, ENT_QUOTES, 'UTF-8') ?>'" alt="Aperçu" />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">Image actuelle</span>
                </div>
              </div>
            <?php endif; ?>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="image_alt">Texte alternatif (SEO)</label>
          <input class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="image_alt" id="image_alt" value="<?= htmlspecialchars($project['image_alt'] ?? '', ENT_QUOTES, 'UTF-8') ?>" placeholder="Ex: Capture d'écran du tableau de bord" />
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Décrit l’image pour l’accessibilité et le référencement</p>
        </div>
      </div>

      <div class="flex gap-4 pt-4">
        <button type="submit" class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          <?= $project['id'] ? 'Mettre à jour' : 'Créer' ?>
        </button>
        <a class="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base . '/admin/projects', ENT_QUOTES, 'UTF-8') ?>">Annuler</a>
      </div>
    </form>
  </div>
</div>

<script>
function addTechField(button) {
  const div = document.createElement('div');
  div.className = 'flex gap-2';
  div.innerHTML = '<input class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="stack[]" placeholder="Ex: PHP, JavaScript..." /><button type="button" class="px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" onclick="this.parentElement.remove()">Supprimer</button>';
  button.parentElement.insertBefore(div, button);
}
</script>
