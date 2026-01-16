<?php
declare(strict_types=1);

namespace App\Models;

final class Project
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        return [
            [
                'title' => 'CMS léger PHP',
                'stack' => ['PHP 8', 'PDO', 'Tailwind'],
                'description' => 'Un CMS minimaliste en PHP natif avec routing, ORM léger et thèmes.',
                'github' => 'https://github.com/username/cms-php',
                'link' => '#',
            ],
            [
                'title' => 'API REST en PHP',
                'stack' => ['PHP 8', 'JWT', 'MySQL'],
                'description' => 'API RESTful performante avec authentification JWT et tests.',
                'github' => 'https://github.com/username/api-php',
                'link' => '#',
            ],
            [
                'title' => 'Portfolio React + API',
                'stack' => ['React', 'PHP', 'MySQL'],
                'description' => 'SPA React consommant une API PHP pour les projets et le blog.',
                'github' => 'https://github.com/username/portfolio-react-php',
                'link' => '#',
            ],
        ];
    }
}
