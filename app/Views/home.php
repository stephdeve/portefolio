<?php $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="animate-slide-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Backend-first • Web • Mobile • DevOps
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Développeur polyvalent</span><br/>
            orienté backend, mobile & DevOps
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Je conçois des APIs performantes, des architectures fiables et des déploiements automatisés. Mon focus est le backend, avec une vision produit web & mobile et une culture DevOps.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/projects">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              Voir mes projets
            </a>
            <a class="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" href="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/contact">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Me contacter
            </a>
          </div>
        </div>
        <div class="relative animate-slide-in-right">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl transform rotate-6"></div>
          <div class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
            <!-- Photo professionnelle -->
            <div class="relative mb-6">
              <div class="aspect-square w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                <img class="w-full h-full object-cover" src="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/assets/images/profile.jpg?v=<?= urlencode((string) ((@filemtime(((defined('PUBLIC_PATH') ? PUBLIC_PATH : (BASE_PATH . DIRECTORY_SEPARATOR . 'public'))) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'profile.jpg')) ?: time())) ?>" alt="<?= htmlspecialchars($homeImageAlt ?? 'Photo professionnelle', ENT_QUOTES, 'UTF-8') ?>" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiBmaWxsPSJ1cmwoI2dyYWRpZW50MCkiLz4KPHBhdGggZD0iTTE2IDdhNCA0IDAgMTEtOCAwIDQgNCAwIDAxOCAwWk0xMiAxNGE3IDcgMCAwMC03IDdoMTRhNyA3IDAgMDAtNy03eiIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHRleHQgeD0iOTYiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYzNjZGMSIgZmlsbC1vcGFjaXR5PSIwLjciIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+UGhvdG88L3RleHQ+Cjwvc3ZnPgo=';" />
              </div>
              <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>
            <div class="text-center space-y-1 mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Stéphane Steven TOSSOUGBE</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Développeur backend • Web • Mobile • DevOps</p>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">5+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Ans d'expérience</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">50+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Projets livrés</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">15+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">100%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="max-w-4xl mx-auto px-4 my-16">
    <figure class="text-center animate-fade-in">
      <div class="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6"></div>
      <blockquote class="text-3xl md:text-4xl italic font-semibold">
        <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">« Le code est une poésie qui transforme l'imagination en une réalité »</span>
      </blockquote>
      <div class="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-6"></div>
    </figure>
  </section>

<section class="max-w-6xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl my-16">
  <div class="text-center mb-12 animate-fade-in">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Ce que j'apporte</h2>
    <p class="text-lg text-gray-600 dark:text-gray-400">Du backend solide, des apps web & mobile de qualité, et des déploiements maîtrisés.</p>
  </div>
  <div class="grid md:grid-cols-3 gap-8">
    <div class="text-center animate-slide-up" style="animation-delay:0.1s">
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h12M3 17h18"/></svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Backend solide</h3>
      <p class="text-gray-600 dark:text-gray-400">APIs fiables, sécurité, performance et robustesse orientées produit.</p>
    </div>
    <div class="text-center animate-slide-up" style="animation-delay:0.2s">
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM12 18h.01"/></svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Web & Mobile</h3>
      <p class="text-gray-600 dark:text-gray-400">Expérience cohérente du web au mobile, centrée sur l'utilisateur.</p>
    </div>
    <div class="text-center animate-slide-up" style="animation-delay:0.3s">
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13h18M12 3v18M8 21h8"/></svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">DevOps & CI/CD</h3>
      <p class="text-gray-600 dark:text-gray-400">Automatisation, déploiements fiables, observabilité et cloud-ready.</p>
    </div>
  </div>
</section>
