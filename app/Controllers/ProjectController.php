<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\ProjectRepository;

final class ProjectController extends Controller
{
    public function index(): void
    {
        $repo = new ProjectRepository($this->config);
        $projects = $repo->all();
        $this->render('projects', [
            'projects' => $projects,
        ], [
            'title' => 'Projets',
            'description' => 'Sélection de projets remarquables.',
        ]);
    }
}
