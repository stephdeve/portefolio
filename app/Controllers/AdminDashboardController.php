<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Repositories\ProjectRepository;
use App\Repositories\SkillRepository;
use App\Repositories\ContactRepository;

final class AdminDashboardController extends Controller
{
    public function index(): void
    {
        Auth::requireAdmin($this->config);
        $projects = new ProjectRepository($this->config);
        $skills = new SkillRepository($this->config);
        $contacts = new ContactRepository($this->config);

        $stats = [
            'projects' => $projects->count(),
            'skills' => $skills->count(),
            'contacts' => $contacts->count(),
        ];

        $this->render('admin/dashboard', compact('stats'), [
            'title' => 'Tableau de bord',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }
}
