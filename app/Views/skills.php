<?php /** @var array<int, array<string,mixed>> $skills */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
  <!-- Header -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          Expertise technique
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Mes <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">compétences</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Une maîtrise solide des technologies web modernes pour développer des applications robustes, performantes et évolutives.
        </p>
      </div>
    </div>
  </section>

  <!-- Skills Grid -->
  <section class="pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <?php foreach ($skills as $skill): ?>
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white"><?= htmlspecialchars($skill['name'], ENT_QUOTES, 'UTF-8') ?></h3>
              <div class="flex items-center gap-2">
                <span class="text-3xl font-bold text-primary"><?= (int)$skill['level'] ?>%</span>
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <?php if (in_array(strtolower($skill['name']), ['php', 'javascript', 'html', 'css'])): ?>
                    <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <?php if (strtolower($skill['name']) === 'php'): ?>
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
                      <?php elseif (strtolower($skill['name']) === 'javascript'): ?>
                        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.048-.705.15-.646.915-.84 1.515-.66.39-.132.74-.197 1.024-.165 1.48.18 2.224.72 2.94 1.64 1.035 1.373.845 2.095.735 3.956.21 1.395-.39 2.44-1.255 3.175-.87.735-1.95 1.275-3.255 1.63-.45.12-.87.19-1.27.24-.735.12-1.25.12-1.8.045-.42-.06-.795-.165-1.125-.345-1.23-.75-1.815-1.425-1.815-3.105 0-1.095.345-1.86 1.095-2.34.675-.435 1.395-.6 2.115-.48.735.12 1.365.36 1.95.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18-1.26 0-2.22-.42-2.895-1.26-.675-.84-.945-1.815-.945-2.94 0-1.095.3-1.89.945-2.34.645-.45 1.38-.6 2.19-.48.81.12 1.53.36 2.16.84.945.84 1.815 1.815 2.61 3.045.39.6.735 1.095.945 1.5.21.405.3.795.255 1.275-.045.435-.21.795-.48 1.095-.27.3-.645.48-1.02.6-.375.12-.795.18-1.26.18z"/>
                      <?php elseif (strtolower($skill['name']) === 'html'): ?>
                        <path d="M12 17.56L4.07 16.13l-.93-10.26h17.72l-.93 10.26L12 17.56zM4.44 8.13l.74 8.26L12 17.5l6.82-1.11.74-8.26H4.44z"/>
                      <?php else: ?>
                        <path d="M19.03 18.28c-.2.02-.36.11-.5.23l-1.29 1.01c-.18.14-.23.41-.12.61.23.41.19.9-.14 1.32-.33.42-.87.54-1.32.33l-1.29-1.01c-.14-.11-.41-.23-.61-.12-.41.23-.54.87-.33 1.32l1.01 1.29c.11.14.23.41.12.61-.23.41-.19.9.14 1.32.33.42.87.54 1.32.33l1.29-1.01c.14-.11.41-.23.61-.12.41.23.54.87.33 1.32l-1.01 1.29c-.11.14-.23.41-.12.61.23.41.19.9-.14 1.32-.33.42-.87.54-1.32.33l-1.29-1.01c-.14-.11-.41-.23-.61-.12-.41.23-.54.87-.33 1.32l1.01 1.29c.11.14.23.41.12.61z"/>
                      <?php endif; ?>
                    </svg>
                  <?php else: ?>
                    <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  <?php endif; ?>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Niveau de maîtrise</span>
                <span class="font-medium text-gray-900 dark:text-white"><?= (int)$skill['level'] ?>%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 ease-out animate-fade-in" style="width: <?= (int)$skill['level'] ?>%">
                  <div class="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Catégorie</span>
                <span class="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <?php
                  $name = strtolower($skill['name']);
                  if (in_array($name, ['php', 'mysql', 'sqlite', 'postgresql'])) echo 'Backend';
                  elseif (in_array($name, ['javascript', 'typescript', 'react', 'vue', 'angular'])) echo 'Frontend';
                  elseif (in_array($name, ['html', 'css', 'sass', 'tailwind'])) echo 'Design';
                  elseif (in_array($name, ['git', 'docker', 'linux', 'nginx'])) echo 'DevOps';
                  else echo 'Autre';
                  ?>
                </span>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-20 bg-white/50 dark:bg-gray-900/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          En <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">chiffres</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Une expertise acquise à travers de nombreux projets et années d'expérience.
        </p>
      </div>
      <div class="grid md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2"><?= count($skills) ?></div>
          <div class="text-gray-600 dark:text-gray-400">Technologies maîtrisées</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2"><?= (int)(array_sum(array_column($skills, 'level')) / count($skills)) ?>%</div>
          <div class="text-gray-600 dark:text-gray-400">Niveau moyen</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">5+</div>
          <div class="text-gray-600 dark:text-gray-400">Ans d'expérience</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-2">50+</div>
          <div class="text-gray-600 dark:text-gray-400">Projets réalisés</div>
        </div>
      </div>
    </div>
  </section>
</div>
