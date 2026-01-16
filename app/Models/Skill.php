<?php
declare(strict_types=1);

namespace App\Models;

final class Skill
{
    /**
     * @return array<int, array{name:string,level:int}>
     */
    public function all(): array
    {
        return [
            ['name' => 'PHP', 'level' => 95],
            ['name' => 'JavaScript', 'level' => 90],
            ['name' => 'MySQL', 'level' => 85],
            ['name' => 'HTML5/CSS3', 'level' => 92],
            ['name' => 'Git', 'level' => 88],
            ['name' => 'Docker', 'level' => 75],
            ['name' => 'Linux', 'level' => 80],
            ['name' => 'REST APIs', 'level' => 85],
        ];
    }

    /**
     * @return array<int, array{name:string,level:int}>
     */
    public function top(int $limit): array
    {
        return array_slice($this->all(), 0, $limit);
    }
}
