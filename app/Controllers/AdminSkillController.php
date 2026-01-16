<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Core\Csrf;
use App\Core\Session;
use App\Repositories\SkillRepository;

final class AdminSkillController extends Controller
{
    public function index(): void
    {
        Auth::requireAdmin($this->config);
        $repo = new SkillRepository($this->config);
        $skills = $repo->all();
        $success = Session::flash('success');
        $error = Session::flash('error');
        $this->render('admin/skills/index', compact('skills', 'success', 'error'), [
            'title' => 'Compétences',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function create(): void
    {
        Auth::requireAdmin($this->config);
        $skill = ['id' => null, 'name' => '', 'level' => 50];
        $this->render('admin/skills/form', compact('skill'), [
            'title' => 'Nouvelle compétence',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function store(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/skills');
        }
        $name = trim((string)($_POST['name'] ?? ''));
        $level = (int)($_POST['level'] ?? 0);
        if ($name === '' || $level < 0 || $level > 100) {
            Session::flash('error', 'Nom ou niveau invalide.');
            $this->redirect('/admin/skills/create');
        }
        $repo = new SkillRepository($this->config);
        $repo->create($name, $level);
        Session::flash('success', 'Compétence créée.');
        $this->redirect('/admin/skills');
    }

    public function edit(): void
    {
        Auth::requireAdmin($this->config);
        $id = (int)($_GET['id'] ?? 0);
        $repo = new SkillRepository($this->config);
        $skill = $repo->find($id);
        if (!$skill) {
            Session::flash('error', 'Compétence introuvable.');
            $this->redirect('/admin/skills');
        }
        $this->render('admin/skills/form', compact('skill'), [
            'title' => 'Modifier la compétence',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function update(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/skills');
        }
        $id = (int)($_POST['id'] ?? 0);
        $name = trim((string)($_POST['name'] ?? ''));
        $level = (int)($_POST['level'] ?? 0);
        if ($id > 0 && $name !== '' && $level >= 0 && $level <= 100) {
            $repo = new SkillRepository($this->config);
            $repo->update($id, $name, $level);
            Session::flash('success', 'Compétence mise à jour.');
        } else {
            Session::flash('error', 'Données invalides.');
        }
        $this->redirect('/admin/skills');
    }

    public function delete(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/skills');
        }
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $repo = new SkillRepository($this->config);
            $repo->delete($id);
            Session::flash('success', 'Compétence supprimée.');
        }
        $this->redirect('/admin/skills');
    }
}
