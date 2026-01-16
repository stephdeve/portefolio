<?php
declare(strict_types=1);

namespace App\Core;

final class Csrf
{
    public static function token(): string
    {
        Session::start();
        if (empty($_SESSION['_csrf'])) {
            $_SESSION['_csrf'] = bin2hex(random_bytes(32));
        }
        return (string) $_SESSION['_csrf'];
    }

    public static function check(?string $token): bool
    {
        Session::start();
        $t = (string)($_SESSION['_csrf'] ?? '');
        return $token !== null && $t !== '' && hash_equals($t, (string)$token);
    }
}
