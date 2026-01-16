<?php /** @var array{projects:int,skills:int,contacts:int} $stats */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="space-y-8 animate-fade-in">
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Vue d’ensemble de votre portfolio</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6">
    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-gray-900 dark:text-white"><?= (int)$stats['projects'] ?></div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Projets</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div class="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full animate-pulse-slow" style="width: <?= min(100, (int)$stats['projects'] * 10) ?>%"></div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-gray-900 dark:text-white"><?= (int)$stats['skills'] ?></div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Compétences</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse-slow" style="width: <?= min(100, (int)$stats['skills'] * 8) ?>%"></div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-gray-900 dark:text-white"><?= (int)$stats['contacts'] ?></div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Messages</div>
        </div>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div class="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full animate-pulse-slow" style="width: <?= min(100, (int)$stats['contacts'] * 15) ?>%"></div>
      </div>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Actions rapides</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <a class="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/projects">
        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        </div>
        <div>
          <div class="font-medium text-gray-900 dark:text-white">Gérer les projets</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Ajouter, modifier, supprimer</div>
        </div>
      </a>
      <a class="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/skills">
        <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <div>
          <div class="font-medium text-gray-900 dark:text-white">Gérer les compétences</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Mettre à jour les niveaux</div>
        </div>
      </a>
      <a class="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/admin/contacts">
        <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <div class="font-medium text-gray-900 dark:text-white">Voir les messages</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Lire et supprimer</div>
        </div>
      </a>
    </div>
  </div>
</div>
