<?php
declare(strict_types=1);

namespace App\Core;

use PDO;
use PDOException;

final class Database
{
    private static ?PDO $pdo = null;

    public static function connection(array $config): PDO
    {
        if (self::$pdo) {
            return self::$pdo;
        }

        $driver = $config['db']['driver'] ?? 'mysql';
        $host = $config['db']['host'] ?? '127.0.0.1';
        $port = (string)($config['db']['port'] ?? '3306');
        $dbname = $config['db']['name'] ?? '';
        $charset = $config['db']['charset'] ?? 'utf8mb4';
        $user = $config['db']['user'] ?? '';
        $pass = $config['db']['pass'] ?? '';

        $dsn = $config['db']['dsn'] ?? '';
        if ($driver === 'mysql') {
            $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset={$charset}";
        } elseif ($driver === 'sqlite') {
            $path = $config['db']['path'] ?? (BASE_PATH . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'database.sqlite');
            $dsn = 'sqlite:' . $path;
        }

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            if ($driver === 'sqlite') {
                self::$pdo = new PDO($dsn, null, null, $options);
                self::$pdo->exec('PRAGMA foreign_keys = ON');
            } else {
                self::$pdo = new PDO($dsn, $user, $pass, $options);
            }
            return self::$pdo;
        } catch (PDOException $e) {
            throw new \RuntimeException('Database connection failed: ' . $e->getMessage());
        }
    }
}
