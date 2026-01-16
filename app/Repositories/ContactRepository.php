<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Core\Database;
use PDO;

final class ContactRepository
{
    private PDO $pdo;

    public function __construct(private array $config)
    {
        $this->pdo = Database::connection($config);
    }

    public function create(string $name, string $email, string $message): int
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('INSERT INTO contacts(name, email, message, created_at) VALUES(:n,:e,:m,:c)');
        $stmt->execute([
            ':n' => $name,
            ':e' => $email,
            ':m' => $message,
            // Use MySQL-friendly DATETIME format while remaining OK for SQLite TEXT
            ':c' => (new \DateTimeImmutable())->format('Y-m-d H:i:s'),
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        $this->ensureTable();
        return $this->pdo->query('SELECT id, name, email, message, created_at FROM contacts ORDER BY id DESC')->fetchAll();
    }

    public function count(): int
    {
        $this->ensureTable();
        return (int) $this->pdo->query('SELECT COUNT(*) FROM contacts')->fetchColumn();
    }

    public function delete(int $id): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('DELETE FROM contacts WHERE id=:id');
        return $stmt->execute([':id' => $id]);
    }

    private function ensureTable(): void
    {
        try { $this->pdo->query('SELECT 1 FROM contacts LIMIT 1'); } catch (\Throwable) { /* ignore */ }
    }
}
