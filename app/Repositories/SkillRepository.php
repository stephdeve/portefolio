<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Core\Database;
use PDO;

final class SkillRepository
{
    private PDO $pdo;

    public function __construct(private array $config)
    {
        $this->pdo = Database::connection($config);
    }

    /**
     * @return array<int, array{name:string,level:int}>
     */
    public function all(): array
    {
        $this->ensureTable();
        $rows = $this->pdo->query('SELECT id, name, level FROM skills ORDER BY level DESC, name ASC')->fetchAll();
        return array_map(fn($r) => ['id' => (int)$r['id'], 'name' => (string)$r['name'], 'level' => (int)$r['level']], $rows);
    }

    /**
     * @return array<int, array{name:string,level:int}>
     */
    public function top(int $limit): array
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('SELECT name, level FROM skills ORDER BY level DESC, name ASC LIMIT :l');
        $stmt->bindValue(':l', $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        return array_map(fn($r) => ['name' => (string)$r['name'], 'level' => (int)$r['level']], $rows);
    }

    public function count(): int
    {
        $this->ensureTable();
        return (int) $this->pdo->query('SELECT COUNT(*) FROM skills')->fetchColumn();
    }

    /**
     * @return array{id:int,name:string,level:int}|null
     */
    public function find(int $id): ?array
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('SELECT id, name, level FROM skills WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        if (!$row) return null;
        return ['id' => (int)$row['id'], 'name' => (string)$row['name'], 'level' => (int)$row['level']];
    }

    public function findByName(string $name): ?array
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('SELECT name, level FROM skills WHERE name = :n');
        $stmt->execute([':n' => $name]);
        $row = $stmt->fetch();
        return $row ? ['name' => (string)$row['name'], 'level' => (int)$row['level']] : null;
    }

    public function create(string $name, int $level): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('INSERT INTO skills(name, level) VALUES(:n,:l)');
        return $stmt->execute([':n' => $name, ':l' => $level]);
    }

    public function update(int $id, string $name, int $level): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('UPDATE skills SET name = :n, level = :l WHERE id = :id');
        return $stmt->execute([':id' => $id, ':n' => $name, ':l' => $level]);
    }

    public function delete(int $id): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('DELETE FROM skills WHERE id = :id');
        return $stmt->execute([':id' => $id]);
    }

    private function ensureTable(): void
    {
        try { $this->pdo->query('SELECT 1 FROM skills LIMIT 1'); } catch (\Throwable) { /* ignore */ }
    }
}
