<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '1');

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'app');
define('PUBLIC_PATH', __DIR__);

// Prefer Composer autoload if installed, otherwise fallback to minimal autoload
$composerAutoload = BASE_PATH . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
if (is_file($composerAutoload)) {
    require $composerAutoload;
} else {
    spl_autoload_register(function (string $class): void {
        $prefix = 'App\\';
        $baseDir = APP_PATH . DIRECTORY_SEPARATOR;
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            return;
        }
        $relativeClass = substr($class, $len);
        $file = $baseDir . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';
        if (is_file($file)) {
            require $file;
        }
    });
}

/** @var array $config */
$config = require BASE_PATH . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'config.php';
if (($config['app']['env'] ?? 'production') !== 'development') {
    ini_set('display_errors', '0');
}

use App\Core\Router;
use App\Core\Migrator;
use App\Controllers\HomeController;
use App\Controllers\ProjectController;
use App\Controllers\ContactController;
use App\Controllers\ApiController;
use App\Controllers\AdminAuthController;
use App\Controllers\AdminDashboardController;
use App\Controllers\AdminProjectController;
use App\Controllers\AdminSkillController;
use App\Controllers\AdminContactController;
use App\Controllers\AdminSettingsController;

$router = new Router($config);

// Run lightweight migrations/seed for SQLite (dev-friendly) and MySQL tables if enabled
Migrator::run($config);

$router->get('/', [HomeController::class, 'index']);
$router->get('/projects', [ProjectController::class, 'index']);
$router->get('/skills', [HomeController::class, 'skills']);
$router->get('/contact', [ContactController::class, 'index']);
$router->post('/contact/submit', [ContactController::class, 'submit']);

// API endpoints
$router->get('/api/projects', [ApiController::class, 'projects']);
$router->get('/api/skills', [ApiController::class, 'skills']);

// Admin auth
$router->get('/admin/login', [AdminAuthController::class, 'login']);
$router->post('/admin/login', [AdminAuthController::class, 'authenticate']);
$router->post('/admin/logout', [AdminAuthController::class, 'logout']);

// Admin dashboard
$router->get('/admin', [AdminDashboardController::class, 'index']);

// Admin Projects
$router->get('/admin/projects', [AdminProjectController::class, 'index']);
$router->get('/admin/projects/create', [AdminProjectController::class, 'create']);
$router->post('/admin/projects', [AdminProjectController::class, 'store']);
$router->get('/admin/projects/edit', [AdminProjectController::class, 'edit']);
$router->post('/admin/projects/update', [AdminProjectController::class, 'update']);
$router->post('/admin/projects/delete', [AdminProjectController::class, 'delete']);

// Admin Skills
$router->get('/admin/skills', [AdminSkillController::class, 'index']);
$router->get('/admin/skills/create', [AdminSkillController::class, 'create']);
$router->post('/admin/skills', [AdminSkillController::class, 'store']);
$router->get('/admin/skills/edit', [AdminSkillController::class, 'edit']);
$router->post('/admin/skills/update', [AdminSkillController::class, 'update']);
$router->post('/admin/skills/delete', [AdminSkillController::class, 'delete']);

// Admin Contacts
$router->get('/admin/contacts', [AdminContactController::class, 'index']);
$router->post('/admin/contacts/delete', [AdminContactController::class, 'delete']);

// Admin Settings
$router->get('/admin/settings', [AdminSettingsController::class, 'index']);
$router->post('/admin/settings/profile', [AdminSettingsController::class, 'updateProfileImage']);

$router->setNotFound(function () use ($config) {
    http_response_code(404);
    $view = new App\Core\View($config);
    echo $view->render('404', ['path' => parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH)], ['title' => 'Page introuvable']);
});

$router->dispatch();
