<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\ProjectRepository;
use App\Repositories\SkillRepository;

final class ApiController extends Controller
{
    public function projects(): void
    {
        $repo = new ProjectRepository($this->config);
        $projects = $repo->all();
        $this->json(['projects' => $projects]);
    }

    public function skills(): void
    {
        $repo = new SkillRepository($this->config);
        $skills = $repo->all();
        $this->json(['skills' => $skills]);
    }
}
