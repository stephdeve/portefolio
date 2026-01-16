<?php
declare(strict_types=1);

namespace App\Core;

final class Auth
{
    private const SESSION_KEY = 'admin_user';

    public static function isAdmin(array $config): bool
    {
        Session::start();
        $user = (string) ($_SESSION[self::SESSION_KEY] ?? '');
        $expected = (string) ($config['admin']['user'] ?? '');
        return $user !== '' && $expected !== '' && hash_equals($expected, $user);
    }

    public static function login(array $config, string $username, string $password): bool
    {
        Session::start();
        $expectedUser = (string) ($config['admin']['user'] ?? '');
        $expectedHash = (string) ($config['admin']['pass_hash'] ?? '');
        if ($expectedUser === '' || $expectedHash === '') {
            return false;
        }
        if (!hash_equals($expectedUser, $username)) {
            return false;
        }
        if (!password_verify($password, $expectedHash)) {
            return false;
        }
        $_SESSION[self::SESSION_KEY] = $expectedUser;
        return true;
    }

    public static function logout(): void
    {
        Session::start();
        unset($_SESSION[self::SESSION_KEY]);
    }

    public static function requireAdmin(array $config): void
    {
        if (!self::isAdmin($config)) {
            $base = (string) ($config['app']['base_url'] ?? '');
            header('Location: ' . rtrim($base, '/') . '/admin/login');
            exit;
        }
    }
}
