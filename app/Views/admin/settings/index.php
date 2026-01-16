<?php /** @var string|null $profileImage */ /** @var string|null $profileImageAlt */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="max-w-3xl mx-auto">
  <?php if (!empty($success)): ?>
    <div class="mb-4 p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
      <?= htmlspecialchars($success, ENT_QUOTES, 'UTF-8') ?>
    </div>
  <?php endif; ?>
  <?php if (!empty($error)): ?>
    <div class="mb-4 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
      <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
    </div>
  <?php endif; ?>

  <h2 class="text-2xl font-bold mb-6">Paramètres de la page d'accueil</h2>

  <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
    <h3 class="text-lg font-semibold mb-4">Photo de profil (Accueil)</h3>

    <div class="flex items-start gap-6">
      <div class="w-40">
        <div class="aspect-square w-40 h-40 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow bg-gradient-to-br from-primary/20 to-purple-500/20">
          <?php if (!empty($profileImage)): ?>
            <img class="w-full h-full object-cover" src="<?= htmlspecialchars($base . '/' . ltrim((string)$profileImage, '/'), ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($profileImageAlt ?: 'Photo professionnelle', ENT_QUOTES, 'UTF-8') ?>" />
          <?php else: ?>
            <img class="w-full h-full object-cover" src="<?= htmlspecialchars($base . '/assets/images/profile.jpg', ENT_QUOTES, 'UTF-8') ?>" alt="Photo professionnelle" />
          <?php endif; ?>
        </div>
      </div>

      <form class="flex-1 space-y-4" action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/settings/profile" method="post" enctype="multipart/form-data">
        <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
        <div>
          <label class="block text-sm font-medium mb-1">Image (JPG/PNG/WebP/GIF, max 2 Mo)</label>
          <input class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" type="file" name="image" accept="image/*" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Texte alternatif (accessibilité)</label>
          <input class="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" type="text" name="image_alt" value="<?= htmlspecialchars((string)($profileImageAlt ?? ''), ENT_QUOTES, 'UTF-8') ?>" placeholder="Ex: Portrait professionnel" />
        </div>
        <div class="pt-2">
          <button class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
