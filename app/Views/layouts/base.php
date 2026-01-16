<?php
/** @var array $config */
/** @var array $meta */
/** @var string $content */
$baseUrl = rtrim($config['app']['base_url'] ?? '', '/');
$title = ($meta['title'] ?? ($config['app']['name'] ?? 'Portfolio')) . ' | ' . ($config['app']['name'] ?? 'Portfolio');
$description = $meta['description'] ?? ($config['app']['description'] ?? 'Portfolio développeur');
$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$basePath = parse_url($baseUrl, PHP_URL_PATH) ?: '';
$routePath = $currentPath;
if ($basePath && strpos($currentPath, $basePath) === 0) {
    $routePath = substr($currentPath, strlen($basePath));
    if ($routePath === '') { $routePath = '/'; }
}
$currentUrl = $baseUrl . $currentPath;
$hasBuiltCss = defined('PUBLIC_PATH') && file_exists(PUBLIC_PATH . '/assets/css/output.css');
?>
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title ?? 'Portfolio', ENT_QUOTES, 'UTF-8') ?></title>
  <meta name="description" content="<?= htmlspecialchars($description ?? 'Portfolio web professionnel - Développeur PHP & JavaScript', ENT_QUOTES, 'UTF-8') ?>">
  <link rel="icon" type="image/svg+xml" href="<?= htmlspecialchars($baseUrl ?? '', ENT_QUOTES, 'UTF-8') ?>/favicon.svg">
  <?php if ($hasBuiltCss): ?>
    <link rel="stylesheet" href="/assets/css/output.css">
  <?php endif; ?>
  <script>
    // Tailwind CDN configuration (colors, fonts, animations)
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
            sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif']
          },
          animation: {
            'fade-in': 'fadeIn 0.5s ease-in-out',
            'slide-up': 'slideUp 0.6s ease-out',
            'slide-down': 'slideDown 0.6s ease-out',
            'slide-left': 'slideLeft 0.6s ease-out',
            'slide-right': 'slideRight 0.6s ease-out',
            'bounce-in': 'bounceIn 0.8s ease-out'
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' }
            },
            slideUp: {
              '0%': { transform: 'translateY(20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' }
            },
            slideDown: {
              '0%': { transform: 'translateY(-20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' }
            },
            slideLeft: {
              '0%': { transform: 'translateX(20px)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' }
            },
            slideRight: {
              '0%': { transform: 'translateX(-20px)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' }
            },
            bounceIn: {
              '0%': { transform: 'scale(0.3)', opacity: '0' },
              '50%': { transform: 'scale(1.05)' },
              '70%': { transform: 'scale(0.9)' },
              '100%': { transform: 'scale(1)', opacity: '1' }
            }
          }
        }
      }
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // Theme initialization - must run before DOM is loaded
    (function() {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Sync icons if present
      const sun = document.getElementById('iconSun');
      const moon = document.getElementById('iconMoon');
      if (sun && moon) {
        if (document.documentElement.classList.contains('dark')) {
          sun.classList.remove('hidden');
          moon.classList.add('hidden');
        } else {
          sun.classList.add('hidden');
          moon.classList.remove('hidden');
        }
      }
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>html{font-family: Inter, ui-sans-serif, system-ui;}</style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "<?= htmlspecialchars($config['app']['name'] ?? 'Développeur', ENT_QUOTES, 'UTF-8') ?>",
    "url": "<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>",
    "jobTitle": "Développeur PHP",
    "description": "<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>"
  }
  </script>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <header class="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <a href="<?= htmlspecialchars($config['app']['base_url'] ?? '', ENT_QUOTES, 'UTF-8') ?>" class="flex items-center gap-2 min-w-0">
          <div class="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent truncate"><?= htmlspecialchars($config['app']['name'] ?? 'Portfolio', ENT_QUOTES, 'UTF-8') ?></span>
        </a>
        <ul class="hidden sm:flex items-center gap-6 text-sm font-medium shrink-0">
          <li><a class="hover:text-primary transition-colors <?= ($routePath === '/') ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($config['app']['base_url'] ?? '', ENT_QUOTES, 'UTF-8') ?>" <?= ($routePath === '/') ? 'aria-current="page"' : '' ?>>Accueil</a></li>
          <li><a class="hover:text-primary transition-colors <?= (strpos($routePath, '/projects') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($config['app']['base_url'] ?? '', ENT_QUOTES, 'UTF-8') ?>/projects" <?= (strpos($routePath, '/projects') === 0) ? 'aria-current="page"' : '' ?>>Projets</a></li>
          <li><a class="hover:text-primary transition-colors <?= (strpos($routePath, '/skills') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($config['app']['base_url'] ?? '', ENT_QUOTES, 'UTF-8') ?>/skills" <?= (strpos($routePath, '/skills') === 0) ? 'aria-current="page"' : '' ?>>Compétences</a></li>
          <li><a class="hover:text-primary transition-colors <?= (strpos($routePath, '/contact') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($config['app']['base_url'] ?? '', ENT_QUOTES, 'UTF-8') ?>/contact" <?= (strpos($routePath, '/contact') === 0) ? 'aria-current="page"' : '' ?>>Contact</a></li>
        </ul>
        <button id="themeToggle" class="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 shrink-0" aria-label="Basculer le thème">
          <svg id="iconSun" class="h-5 w-5 hidden dark:inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95 5.636 18.364"/><circle cx="12" cy="12" r="4"/></svg>
          <svg id="iconMoon" class="h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="sm:hidden p-2 rounded-md border border-gray-200 dark:border-gray-800" id="menuBtn" aria-label="Menu">☰</button>
      </div>
    </nav>
    <div id="mobileNav" class="sm:hidden hidden border-t border-gray-100 dark:border-gray-800">
      <nav class="px-4 py-2 flex flex-col gap-2">
        <a class="py-2 hover:text-primary transition <?= ($routePath === '/') ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>" <?= ($routePath === '/') ? 'aria-current="page"' : '' ?>>Accueil</a>
        <a class="py-2 hover:text-primary transition <?= (strpos($routePath, '/projects') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/projects" <?= (strpos($routePath, '/projects') === 0) ? 'aria-current="page"' : '' ?>>Projets</a>
        <a class="py-2 hover:text-primary transition <?= (strpos($routePath, '/skills') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/skills" <?= (strpos($routePath, '/skills') === 0) ? 'aria-current="page"' : '' ?>>Compétences</a>
        <a class="py-2 hover:text-primary transition <?= (strpos($routePath, '/contact') === 0) ? 'text-primary font-semibold' : '' ?>" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/contact" <?= (strpos($routePath, '/contact') === 0) ? 'aria-current="page"' : '' ?>>Contact</a>
      </nav>
    </div>
  </header>

  <main class="min-h-[70vh]">
    <?= $content ?>
  </main>

  <footer class="border-t border-gray-100 dark:border-gray-800 mt-16">
    <div class="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
      <p>© <?= date('Y') ?> <?= htmlspecialchars($config['app']['name'] ?? 'Portfolio', ENT_QUOTES, 'UTF-8') ?>. Tous droits réservés.</p>
      <div class="flex items-center justify-center md:justify-end gap-4">
        <a class="hover:text-primary" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/projects">Projets</a>
        <a class="hover:text-primary" href="<?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/contact">Contact</a>
      </div>
    </div>
  </footer>

  <script src="/assets/js/app.js" defer></script>
</body>
</html>
