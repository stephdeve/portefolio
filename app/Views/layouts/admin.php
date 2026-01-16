<?php
/** @var array $config */
/** @var array $meta */
/** @var string $content */
$baseUrl = rtrim($config['app']['base_url'] ?? '', '/');
$title = ($meta['title'] ?? 'Admin') . ' | Admin - ' . ($config['app']['name'] ?? 'Portfolio');
$hasBuiltCss = defined('PUBLIC_PATH') && file_exists(PUBLIC_PATH . '/assets/css/output.css');

// Determine current route path relative to base for active tab highlighting
$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$basePath = parse_url($baseUrl, PHP_URL_PATH) ?: '';
$routePath = $currentPath;
if ($basePath && strpos($currentPath, $basePath) === 0) {
  $routePath = substr($currentPath, strlen($basePath));
  if ($routePath === '') { $routePath = '/'; }
}
?>
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow" />
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <?php if ($hasBuiltCss): ?>
    <link rel="stylesheet" href="/assets/css/output.css">
  <?php else: ?>
    <script>
      tailwind = window.tailwind || {};
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              primary: {
                DEFAULT: '#6366F1',
                50: '#EEF2FF',
                100: '#E0E7FF',
                200: '#C7D2FE',
                300: '#A5B4FC',
                400: '#818CF8',
                500: '#6366F1',
                600: '#4F46E5',
                700: '#4338CA',
                800: '#3730A3',
                900: '#312E81',
                950: '#1E1B4B'
              }
            },
            fontFamily: {
              'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif']
            }
          }
        }
      };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
  <?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>html{font-family: Inter, ui-sans-serif, system-ui;}</style>
  <script>
    (function() {
      const theme = localStorage.getItem('admin-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const html = document.documentElement;
      if (theme === 'dark' || (!theme && prefersDark)) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      // Sync icons if present
      const sun = document.getElementById('iconSun');
      const moon = document.getElementById('iconMoon');
      if (sun && moon) {
        if (html.classList.contains('dark')) {
          sun.classList.remove('hidden');
          moon.classList.add('hidden');
        } else {
          sun.classList.add('hidden');
          moon.classList.remove('hidden');
        }
      }
    })();
  </script>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen">
  <header class="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            </div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Admin</h1>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">·</span>
          <span class="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline"><?= htmlspecialchars($config['app']['name'] ?? 'Portfolio', ENT_QUOTES, 'UTF-8') ?></span>
        </div>
        <div class="flex items-center gap-2 min-w-0">
          <nav class="hidden sm:flex flex-1 items-center gap-2 md:gap-3 lg:gap-4 overflow-x-auto whitespace-nowrap">
            <a class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= ($routePath === '/admin' || $routePath === '/admin/') ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin" <?= ($routePath === '/admin' || $routePath === '/admin/') ? 'aria-current="page"' : '' ?>>Dashboard</a>
            <a class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/projects') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/projects" <?= (strpos($routePath, '/admin/projects') === 0) ? 'aria-current="page"' : '' ?>>Projets</a>
            <a class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/skills') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/skills" <?= (strpos($routePath, '/admin/skills') === 0) ? 'aria-current="page"' : '' ?>>Compétences</a>
            <a class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/contacts') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/contacts" <?= (strpos($routePath, '/admin/contacts') === 0) ? 'aria-current="page"' : '' ?>>Contacts</a>
            <a class="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/settings') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/settings" <?= (strpos($routePath, '/admin/settings') === 0) ? 'aria-current="page"' : '' ?>>Paramètres</a>
            <form action="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/logout" method="post">
              <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
              <button class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="submit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Déconnexion
              </button>
            </form>
          </nav>
          <button id="adminThemeToggle" class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0" aria-label="Basculer le thème">
            <svg id="iconSun" class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95 5.636 18.364"/><circle cx="12" cy="12" r="4"/></svg>
            <svg id="iconMoon" class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button id="mobileMenuButton" class="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Menu">
            <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div id="mobileMenu" class="sm:hidden hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <div class="px-4 pt-2 pb-4 space-y-1">
      <a class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= ($routePath === '/admin' || $routePath === '/admin/') ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin" <?= ($routePath === '/admin' || $routePath === '/admin/') ? 'aria-current="page"' : '' ?>>Dashboard</a>
      <a class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/projects') === 0) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/projects" <?= (strpos($routePath, '/admin/projects') === 0) ? 'aria-current="page"' : '' ?>>Projets</a>
      <a class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/skills') === 0) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/skills" <?= (strpos($routePath, '/admin/skills') === 0) ? 'aria-current="page"' : '' ?>>Compétences</a>
      <a class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/contacts') === 0) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/contacts" <?= (strpos($routePath, '/admin/contacts') === 0) ? 'aria-current="page"' : '' ?>>Contacts</a>
      <a class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors <?= (strpos($routePath, '/admin/settings') === 0) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/settings" <?= (strpos($routePath, '/admin/settings') === 0) ? 'aria-current="page"' : '' ?>>Paramètres</a>
      <div class="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
        <form action="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/admin/logout" method="post">
          <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
          <button class="w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="submit">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Déconnexion
          </button>
        </form>
      </div>
    </div>
  </div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
    <?= $content ?>
  </main>

  <script>
    (function(){
      const btn = document.getElementById('adminThemeToggle');
      if (btn) {
        btn.addEventListener('click', function() {
          const html = document.documentElement;
          const isDark = html.classList.contains('dark');
          const sun = document.getElementById('iconSun');
          const moon = document.getElementById('iconMoon');
          if (isDark) {
            html.classList.remove('dark');
            localStorage.setItem('admin-theme', 'light');
            if (sun && moon) { sun.classList.add('hidden'); moon.classList.remove('hidden'); }
          } else {
            html.classList.add('dark');
            localStorage.setItem('admin-theme', 'dark');
            if (sun && moon) { sun.classList.remove('hidden'); moon.classList.add('hidden'); }
          }
        });
      }
      const mobileMenuButton = document.getElementById('mobileMenuButton');
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
          const isHidden = mobileMenu.classList.contains('hidden');
          mobileMenu.classList.toggle('hidden');
          mobileMenuButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
        document.addEventListener('click', function(e) {
          if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
          }
        });
        mobileMenu.querySelectorAll('a, button').forEach(function(el){
          el.addEventListener('click', function(){
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
          });
        });
      }
    })();
  </script>
</body>
</html>
