<?php
declare(strict_types=1);

$root = dirname(__DIR__);

// Load environment variables: prefer Dotenv if installed, fallback to simple parser
if (is_file($root . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php')) {
    require_once $root . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
    \Dotenv\Dotenv::createImmutable($root)->safeLoad();
} else {
    (function(string $root): void {
        $envFile = $root . DIRECTORY_SEPARATOR . '.env';
        if (!is_file($envFile)) { return; }
        $lines = @file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!$lines) { return; }
        foreach ($lines as $line) {
            if (str_starts_with(trim($line), '#')) { continue; }
            $pos = strpos($line, '=');
            if ($pos === false) { continue; }
            $key = trim(substr($line, 0, $pos));
            $value = trim(substr($line, $pos + 1));
            // Remove surrounding quotes if present (avoid negative string offsets)
            $first = $value !== '' ? $value[0] : '';
            $last = $value !== '' ? substr($value, -1) : '';
            if ($value !== '' && (($first === '"' && $last === '"') || ($first === "'" && $last === "'"))) {
                $value = substr($value, 1, -1);
            }
            if ($key !== '' && !array_key_exists($key, $_ENV)) {
                $_ENV[$key] = $value;
            }
        }
    })($root);
}

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
$baseUrl = $scheme . '://' . $host . ($basePath && $basePath !== '/' ? $basePath : '');

$env = fn(string $key, mixed $default = null) => $_ENV[$key] ?? $default;

return [
    'app' => [
        'name' => (string) $env('APP_NAME', 'Portfolio'),
        'description' => (string) $env('APP_DESCRIPTION', 'Portfolio professionnel de développeur.'),
        // Allow overriding computed base URL via APP_URL to avoid broken asset links
        'base_url' => (string) $env('APP_URL', $baseUrl),
        'env' => (string) $env('APP_ENV', 'production'),
    ],
    'db' => [
        'driver' => (string) $env('DB_DRIVER', 'sqlite'),
        'host' => (string) $env('DB_HOST', '127.0.0.1'),
        'port' => (int) $env('DB_PORT', 3306),
        'name' => (string) $env('DB_NAME', ''),
        'user' => (string) $env('DB_USER', ''),
        'pass' => (string) $env('DB_PASS', ''),
        'charset' => (string) $env('DB_CHARSET', 'utf8mb4'),
        'path' => (string) $env('SQLITE_PATH', $root . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'database.sqlite'),
    ],
    'mail' => [
        'host' => (string) $env('SMTP_HOST', ''),
        'port' => (int) $env('SMTP_PORT', 587),
        'user' => (string) $env('SMTP_USER', ''),
        'pass' => (string) $env('SMTP_PASS', ''),
        'encryption' => (string) $env('SMTP_ENCRYPTION', 'tls'),
        'from' => (string) $env('MAIL_FROM', 'no-reply@example.com'),
        'from_name' => (string) $env('MAIL_FROM_NAME', 'Portfolio'),
        'to' => (string) $env('MAIL_TO', 'owner@example.com'),
    ],
    'owner' => [
        'name' => (string) $env('OWNER_NAME', ''),
        'headline' => (string) $env('OWNER_HEADLINE', 'Développeur backend • Web • Mobile • DevOps'),
        'email' => (string) $env('CONTACT_EMAIL', $env('MAIL_TO', 'owner@example.com')),
        'location' => (string) $env('CONTACT_LOCATION', ''),
        'availability' => (string) $env('CONTACT_AVAILABILITY', ''),
        'github' => (string) $env('SOCIAL_GITHUB', ''),
        'linkedin' => (string) $env('SOCIAL_LINKEDIN', ''),
        'twitter' => (string) $env('SOCIAL_TWITTER', ''),
        'facebook' => (string) $env('SOCIAL_FACEBOOK', ''),
        'whatsapp' => (string) $env('SOCIAL_WHATSAPP', ''),
    ],
    'admin' => [
        'user' => (string) $env('ADMIN_USER', ''),
        'pass_hash' => (string) $env('ADMIN_PASS_HASH', ''),
    ],
];
