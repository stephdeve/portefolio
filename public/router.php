<?php
declare(strict_types=1);

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
$publicDir = __DIR__;
$requested = realpath($publicDir . $uri);

if ($requested && is_file($requested) && str_starts_with($requested, $publicDir)) {
    return false; // Let PHP's built-in server serve the static file
}

require __DIR__ . '/index.php';
