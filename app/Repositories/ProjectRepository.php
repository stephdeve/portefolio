<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Core\Database;
use PDO;

final class ProjectRepository
{
    private PDO $pdo;

    public function __construct(private array $config)
    {
        $this->pdo = Database::connection($config);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        // If table doesn't exist yet, return empty array
        $this->ensureTable();
        $rows = $this->pdo->query('SELECT id, title, stack, description, github, link, image, image_alt FROM projects ORDER BY id DESC')->fetchAll();
        foreach ($rows as &$row) {
            $row['stack'] = $row['stack'] ? (json_decode((string)$row['stack'], true) ?: []) : [];
        }
        return $rows;
    }

    public function count(): int
    {
        $this->ensureTable();
        return (int) $this->pdo->query('SELECT COUNT(*) FROM projects')->fetchColumn();
    }

    public function find(int $id): ?array
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('SELECT id, title, stack, description, github, link, image, image_alt FROM projects WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        if (!$row) return null;
        $row['stack'] = $row['stack'] ? (json_decode((string)$row['stack'], true) ?: []) : [];
        return $row;
    }

    public function create(string $title, array $stack, ?string $description, ?string $github, ?string $link, ?string $image, ?string $imageAlt): int
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('INSERT INTO projects(title, stack, description, github, link, image, image_alt) VALUES(:t,:s,:d,:g,:l,:img,:alt)');
        $stmt->execute([
            ':t' => $title,
            ':s' => json_encode(array_values($stack), JSON_UNESCAPED_UNICODE),
            ':d' => $description,
            ':g' => $github,
            ':l' => $link,
            ':img' => $image,
            ':alt' => $imageAlt,
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    public function update(int $id, string $title, array $stack, ?string $description, ?string $github, ?string $link, ?string $image, ?string $imageAlt): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('UPDATE projects SET title=:t, stack=:s, description=:d, github=:g, link=:l, image=:img, image_alt=:alt WHERE id=:id');
        return $stmt->execute([
            ':t' => $title,
            ':s' => json_encode(array_values($stack), JSON_UNESCAPED_UNICODE),
            ':d' => $description,
            ':g' => $github,
            ':l' => $link,
            ':img' => $image,
            ':alt' => $imageAlt,
            ':id' => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $this->ensureTable();
        $stmt = $this->pdo->prepare('DELETE FROM projects WHERE id=:id');
        return $stmt->execute([':id' => $id]);
    }

    public function allPaginated(int $page = 1, int $perPage = 15, ?string $search = null): array
    {
        $this->ensureTable();
        $offset = max(0, ($page - 1) * $perPage);
        $limit = max(1, (int)$perPage);
        $sql = 'SELECT id, title, stack, description, github, link, image, image_alt FROM projects';
        $params = [];
        if ($search !== null && $search !== '') {
            $sql .= ' WHERE title LIKE :search OR description LIKE :search';
            $params[':search'] = '%' . $search . '%';
        }
        // Inject validated integers for MySQL compatibility (placeholders not supported in LIMIT/OFFSET on some setups)
        $sql .= ' ORDER BY id DESC LIMIT ' . (int)$limit . ' OFFSET ' . (int)$offset;
        $stmt = $this->pdo->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue($k, $v);
        }
        $stmt->execute();
        $rows = $stmt->fetchAll();
        foreach ($rows as &$row) {
            $row['stack'] = $row['stack'] ? (json_decode((string)$row['stack'], true) ?: []) : [];
        }
        return $rows;
    }

    public function countSearch(?string $search = null): int
    {
        $this->ensureTable();
        $sql = 'SELECT COUNT(*) FROM projects';
        if ($search !== null && $search !== '') {
            $sql .= ' WHERE title LIKE :search OR description LIKE :search';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(':search', '%' . $search . '%');
            $stmt->execute();
            return (int) $stmt->fetchColumn();
        }
        return (int) $this->pdo->query($sql)->fetchColumn();
    }

    private function ensureTable(): void
    {
        // Lightweight check
        try { $this->pdo->query('SELECT 1 FROM projects LIMIT 1'); } catch (\Throwable) { /* ignore */ }
    }
}
