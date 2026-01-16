<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Core\Database;
use PDO;

final class SettingsRepository
{
    private PDO $pdo;

    public function __construct(private array $config)
    {
        $this->pdo = Database::connection($config);
    }

    private function ensureTable(): void
    {
        try { $this->pdo->query('SELECT 1 FROM settings LIMIT 1'); } catch (\Throwable) { /* ignore */ }
    }

    public function get(string $key): ?string
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('SELECT value FROM settings WHERE `key` = :k');
        $stmt->execute([':k' => $key]);
        $val = $stmt->fetchColumn();
        return $val !== false ? (string)$val : null;
    }

    public function set(string $key, ?string $value): void
    {
        $this->ensureTable();
        $driver = (string) $this->pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
        if ($driver === 'mysql') {
            $sql = 'INSERT INTO settings(`key`, `value`) VALUES(:k, :v)
                    ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)' ;
        } else {
            // SQLite (and others supporting ON CONFLICT)
            $sql = 'INSERT INTO settings(key, value) VALUES(:k, :v)
                    ON CONFLICT(key) DO UPDATE SET value = excluded.value';
        }
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':k' => $key, ':v' => $value]);
    }
}
