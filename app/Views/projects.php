<?php /** @var array<int, array<string,mixed>> $projects */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
  <!-- Header -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          Portfolio de projets
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Mes <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">réalisations</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Découvrez les projets que j'ai développés, des applications web complètes aux API modernes, en passant par les sites e-commerce.
        </p>
      </div>
    </div>
  </section>

  <!-- Projects Grid -->
  <section class="pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <?php foreach ($projects as $project): ?>
          <div class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <?php if (!empty($project['image'])): ?>
              <div class="aspect-video overflow-hidden relative">
                <?php
                  $img = (string)($project['image'] ?? '');
                  $imgFallback = preg_replace('/_resized\.[^.]+$/', '_thumb.jpg', $img) ?: $img;
                ?>
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="<?= htmlspecialchars($base . '/' . $img, ENT_QUOTES, 'UTF-8') ?>" onerror="this.onerror=null; this.src='<?= htmlspecialchars($base . '/' . $imgFallback, ENT_QUOTES, 'UTF-8') ?>'" alt="<?= htmlspecialchars($project['image_alt'] ?? $project['title'], ENT_QUOTES, 'UTF-8') ?>" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            <?php else: ?>
              <div class="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
              </div>
            <?php endif; ?>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                <?= htmlspecialchars($project['title'], ENT_QUOTES, 'UTF-8') ?>
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                <?= htmlspecialchars($project['description'], ENT_QUOTES, 'UTF-8') ?>
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <?php foreach ($project['stack'] ?? [] as $tech): ?>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                    <?= htmlspecialchars($tech, ENT_QUOTES, 'UTF-8') ?>
                  </span>
                <?php endforeach; ?>
              </div>
              <div class="flex gap-3">
                <?php if (!empty($project['github'])): ?>
                  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm font-medium" href="<?= htmlspecialchars($project['github'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Code source
                  </a>
                <?php endif; ?>
                <?php if (!empty($project['link'])): ?>
                  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg" href="<?= htmlspecialchars($project['link'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    Voir le projet
                  </a>
                <?php endif; ?>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
</div>
