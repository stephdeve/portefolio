<?php /** @var string $path */ ?>
<section class="max-w-3xl mx-auto px-4 py-24 text-center">
  <div class="reveal opacity-0 translate-y-4 transition-all duration-700">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">La page "<?= htmlspecialchars($path ?? '', ENT_QUOTES, 'UTF-8') ?>" est introuvable.</p>
    <a href="<?= htmlspecialchars($config['app']['base_url'] ?? '/', ENT_QUOTES, 'UTF-8') ?>/" class="inline-flex items-center px-5 py-3 rounded-md bg-primary text-white hover:opacity-90 transition">Retour à l’accueil</a>
  </div>
</section>
