<?php /** @var bool $success */ /** @var array $errors */ /** @var array<string,mixed> $contact */ $base = rtrim($config['app']['base_url'] ?? '', '/'); ?>
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
  <!-- Header -->
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Contactez-moi
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Parlons de votre <span class="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">projet</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Vous avez une idée en tête ? Un projet à réaliser ? N'hésitez pas à me contacter pour discuter de vos besoins.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Form & Info -->
  <section class="pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informations de contact</h2>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Email</div>
                  <div class="text-gray-600 dark:text-gray-400"><?= htmlspecialchars($contact['email'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Localisation</div>
                  <div class="text-gray-600 dark:text-gray-400"><?= htmlspecialchars($contact['location'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">Disponibilité</div>
                  <div class="text-gray-600 dark:text-gray-400"><?= htmlspecialchars($contact['availability'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Réseaux sociaux</h3>
            <div class="flex flex-wrap gap-4">
              <?php if (!empty($contact['github'])): ?>
                <a class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="<?= htmlspecialchars($contact['github'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              <?php endif; ?>
              <?php if (!empty($contact['linkedin'])): ?>
                <a class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="<?= htmlspecialchars($contact['linkedin'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              <?php endif; ?>
              <?php if (!empty($contact['twitter'])): ?>
                <a class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="<?= htmlspecialchars($contact['twitter'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              <?php endif; ?>
              <?php if (!empty($contact['facebook'])): ?>
                <a class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="<?= htmlspecialchars($contact['facebook'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/></svg>
                </a>
              <?php endif; ?>
              <?php if (!empty($contact['whatsapp'])): ?>
                <a class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors" href="<?= htmlspecialchars($contact['whatsapp'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.44 0 .12 5.32.12 11.92c0 2.1.55 4.15 1.59 5.95L0 24l6.3-1.65a11.87 11.87 0 005.74 1.46h.01c6.6 0 11.92-5.32 11.92-11.92a11.82 11.82 0 00-3.45-8.41zM12.05 21.3h-.01a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.74.98 1-3.64-.22-.37a9.4 9.4 0 01-1.46-5c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.86.98 6.63 2.75a9.29 9.29 0 012.77 6.64c0 5.19-4.23 9.41-9.44 9.41zm5.4-7.07c-.29-.15-1.7-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.14-.17.19-.33.22-.62.07-.29-.15-1.23-.45-2.34-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.49.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.54-.01c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36 0 1.39 1.02 2.74 1.16 2.93.15.19 2 3.05 4.84 4.28.68.29 1.21.46 1.62.58.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z"/></svg>
                </a>
              <?php endif; ?>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envoyez un message</h2>

          <?php if (!empty($success)): ?>
            <div class="mb-6 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Votre message a été envoyé avec succès.</span>
              </div>
            </div>
          <?php endif; ?>

          <?php if (!empty($errors['global'])): ?>
            <div class="mb-6 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                <span><?= htmlspecialchars($errors['global'], ENT_QUOTES, 'UTF-8') ?></span>
              </div>
            </div>
          <?php endif; ?>

          <form action="<?= htmlspecialchars($base, ENT_QUOTES, 'UTF-8') ?>/contact/submit" method="post" class="space-y-6">
            <input type="hidden" name="_csrf" value="<?= htmlspecialchars(\App\Core\Csrf::token(), ENT_QUOTES, 'UTF-8') ?>" />
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="name">Nom complet</label>
              <input class="w-full px-4 py-3 border <?= !empty($errors['name']) ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700' ?> rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="text" name="name" id="name" required placeholder="Jean Dupont" value="<?= htmlspecialchars($old['name'] ?? '', ENT_QUOTES, 'UTF-8') ?>" />
              <?php if (!empty($errors['name'])): ?>
                <p class="mt-2 text-sm text-red-600 dark:text-red-400"><?= htmlspecialchars($errors['name'], ENT_QUOTES, 'UTF-8') ?></p>
              <?php endif; ?>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="email">Adresse email</label>
              <input class="w-full px-4 py-3 border <?= !empty($errors['email']) ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700' ?> rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" type="email" name="email" id="email" required placeholder="jean@exemple.com" value="<?= htmlspecialchars($old['email'] ?? '', ENT_QUOTES, 'UTF-8') ?>" />
              <?php if (!empty($errors['email'])): ?>
                <p class="mt-2 text-sm text-red-600 dark:text-red-400"><?= htmlspecialchars($errors['email'], ENT_QUOTES, 'UTF-8') ?></p>
              <?php endif; ?>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="message">Message</label>
              <textarea class="w-full px-4 py-3 border <?= !empty($errors['message']) ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700' ?> rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" name="message" id="message" rows="5" required placeholder="Décrivez votre projet ou votre demande..."><?= htmlspecialchars($old['message'] ?? '', ENT_QUOTES, 'UTF-8') ?></textarea>
              <?php if (!empty($errors['message'])): ?>
                <p class="mt-2 text-sm text-red-600 dark:text-red-400"><?= htmlspecialchars($errors['message'], ENT_QUOTES, 'UTF-8') ?></p>
              <?php endif; ?>
            </div>
            <button type="submit" class="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
