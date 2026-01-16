<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Core\Csrf;
use App\Core\Session;
use App\Repositories\ContactRepository;

final class AdminContactController extends Controller
{
    public function index(): void
    {
        Auth::requireAdmin($this->config);
        $repo = new ContactRepository($this->config);
        $contacts = $repo->all();
        $success = Session::flash('success');
        $error = Session::flash('error');
        $this->render('admin/contacts/index', compact('contacts', 'success', 'error'), [
            'title' => 'Messages de contact',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function delete(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/contacts');
        }
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $repo = new ContactRepository($this->config);
            $repo->delete($id);
            Session::flash('success', 'Message supprimé.');
        }
        $this->redirect('/admin/contacts');
    }
}
