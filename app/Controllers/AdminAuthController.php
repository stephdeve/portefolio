<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Core\Csrf;
use App\Core\Session;

final class AdminAuthController extends Controller
{
    public function login(): void
    {
        if (Auth::isAdmin($this->config)) {
            $base = (string) ($this->config['app']['base_url'] ?? '');
            header('Location: ' . rtrim($base, '/') . '/admin');
            exit;
        }
        $error = Session::flash('error');
        $this->render('admin/login', compact('error'), [
            'title' => 'Connexion Admin',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function authenticate(): void
    {
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $base = (string) ($this->config['app']['base_url'] ?? '');
            header('Location: ' . rtrim($base, '/') . '/admin/login');
            exit;
        }
        $username = trim((string)($_POST['username'] ?? ''));
        $password = (string)($_POST['password'] ?? '');
        if (!Auth::login($this->config, $username, $password)) {
            Session::flash('error', 'Identifiants invalides.');
            $base = (string) ($this->config['app']['base_url'] ?? '');
            header('Location: ' . rtrim($base, '/') . '/admin/login');
            exit;
        }
        $base = (string) ($this->config['app']['base_url'] ?? '');
        header('Location: ' . rtrim($base, '/') . '/admin');
        exit;
    }

    public function logout(): void
    {
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            $base = (string) ($this->config['app']['base_url'] ?? '');
            header('Location: ' . rtrim($base, '/') . '/admin');
            exit;
        }
        Auth::logout();
        $base = (string) ($this->config['app']['base_url'] ?? '');
        header('Location: ' . rtrim($base, '/') . '/admin/login');
        exit;
    }
}
