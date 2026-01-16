<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\SkillRepository;
use App\Repositories\SettingsRepository;

final class HomeController extends Controller
{
    public function index(): void
    {
        $repo = new SkillRepository($this->config);
        $skills = $repo->top(6);
        $settings = new SettingsRepository($this->config);
        $profileImage = $settings->get('home.profile_image');
        $profileImageAlt = $settings->get('home.profile_image_alt');
        $this->render('home', [
            'skills' => $skills,
            'homeImage' => $profileImage,
            'homeImageAlt' => $profileImageAlt,
        ], [
            'title' => 'Développeur PHP - Portfolio',
            'description' => "Portfolio moderne d’un développeur PHP: projets, compétences et contact.",
        ]);
    }

    public function skills(): void
    {
        $repo = new SkillRepository($this->config);
        $skills = $repo->all();
        $this->render('skills', [
            'skills' => $skills,
        ], [
            'title' => 'Compétences',
            'description' => 'Compétences techniques: PHP, JavaScript, MySQL, Git, et plus.',
        ]);
    }
}
