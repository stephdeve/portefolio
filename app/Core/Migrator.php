<?php
declare(strict_types=1);

namespace App\Core;

use PDO;

final class Migrator
{
    public static function run(array $config): void
    {
        $driver = $config['db']['driver'] ?? 'sqlite';
        if ($driver === 'sqlite') {
            // Ensure sqlite path exists
            $path = (string)($config['db']['path'] ?? (BASE_PATH . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'database.sqlite'));
            $dir = dirname($path);
            if (!is_dir($dir)) {
                @mkdir($dir, 0775, true);
            }
            if (!is_file($path)) {
                @touch($path);
            }
        }

        $pdo = Database::connection($config);
        self::createSchema($pdo, $driver);
        self::seed($pdo);
    }

    private static function createSchema(PDO $pdo, string $driver): void
    {
        if ($driver === 'sqlite') {
            $pdo->exec('CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                stack TEXT DEFAULT NULL,
                description TEXT DEFAULT NULL,
                github TEXT DEFAULT NULL,
                link TEXT DEFAULT NULL
            )');

            // Ensure image column exists on projects (idempotent)
            $hasImage = false;
            $stmt = $pdo->query("PRAGMA table_info('projects')");
            if ($stmt) {
                foreach ($stmt->fetchAll() as $col) {
                    if (isset($col['name']) && (string)$col['name'] === 'image') { $hasImage = true; break; }
                }
            }
            if (!$hasImage) {
                $pdo->exec('ALTER TABLE projects ADD COLUMN image TEXT DEFAULT NULL');
            }

            // Ensure image_alt column exists on projects (idempotent)
            $hasImageAlt = false;
            $stmt = $pdo->query("PRAGMA table_info('projects')");
            if ($stmt) {
                foreach ($stmt->fetchAll() as $col) {
                    if (isset($col['name']) && (string)$col['name'] === 'image_alt') { $hasImageAlt = true; break; }
                }
            }
            if (!$hasImageAlt) {
                $pdo->exec('ALTER TABLE projects ADD COLUMN image_alt TEXT DEFAULT NULL');
            }

            $pdo->exec('CREATE TABLE IF NOT EXISTS skills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                level INTEGER NOT NULL
            )');

            $pdo->exec('CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )');
            $pdo->exec('CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT DEFAULT NULL
            )');
            return;
        }

        // MySQL schema (idempotent)
        $pdo->exec('CREATE TABLE IF NOT EXISTS projects (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            stack TEXT NULL,
            description TEXT NULL,
            github VARCHAR(255) NULL,
            link VARCHAR(255) NULL,
            image VARCHAR(255) NULL,
            image_alt VARCHAR(255) NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

        // Ensure columns exist for legacy schemas
        // Note: MySQL does not support placeholders in SHOW statements; use INFORMATION_SCHEMA instead
        $checkCol = function(string $table, string $col) use ($pdo): bool {
            $sql = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([':t' => $table, ':c' => $col]);
            return ((int) $stmt->fetchColumn()) > 0;
        };
        if (!$checkCol('projects', 'image')) {
            $pdo->exec('ALTER TABLE projects ADD COLUMN image VARCHAR(255) NULL');
        }
        if (!$checkCol('projects', 'image_alt')) {
            $pdo->exec('ALTER TABLE projects ADD COLUMN image_alt VARCHAR(255) NULL');
        }

        $pdo->exec('CREATE TABLE IF NOT EXISTS skills (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            level INT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

        $pdo->exec('CREATE TABLE IF NOT EXISTS contacts (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

        $pdo->exec('CREATE TABLE IF NOT EXISTS settings (
            `key` VARCHAR(191) NOT NULL,
            `value` TEXT NULL,
            PRIMARY KEY (`key`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    }

    private static function seed(PDO $pdo): void
    {
        // Seed skills if empty
        $count = (int) $pdo->query('SELECT COUNT(*) FROM skills')->fetchColumn();
        if ($count === 0) {
            $skills = [
                ['PHP', 95], ['JavaScript', 90], ['MySQL', 85], ['HTML5/CSS3', 92], ['Git', 88], ['Docker', 75], ['Linux', 80], ['REST APIs', 85]
            ];
            $stmt = $pdo->prepare('INSERT INTO skills(name, level) VALUES(?, ?)');
            foreach ($skills as [$name, $level]) {
                $stmt->execute([$name, $level]);
            }
        }

        // Seed projects if empty
        $count = (int) $pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();
        if ($count === 0) {
            $projects = [
                ['CMS léger PHP', ['PHP 8','PDO','Tailwind'], 'Un CMS minimaliste en PHP natif avec routing, ORM léger et thèmes.', 'https://github.com/username/cms-php', '#'],
                ['API REST en PHP', ['PHP 8','JWT','MySQL'], 'API RESTful performante avec authentification JWT et tests.', 'https://github.com/username/api-php', '#'],
                ['Portfolio React + API', ['React','PHP','MySQL'], 'SPA React consommant une API PHP pour les projets et le blog.', 'https://github.com/username/portfolio-react-php', '#'],
            ];
            $stmt = $pdo->prepare('INSERT INTO projects(title, stack, description, github, link) VALUES(?,?,?,?,?)');
            foreach ($projects as [$title, $stack, $desc, $git, $link]) {
                $stmt->execute([$title, json_encode($stack, JSON_UNESCAPED_UNICODE), $desc, $git, $link]);
            }
        }
    }
}
