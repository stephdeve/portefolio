<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Core\Csrf;
use App\Core\Session;
use App\Repositories\ProjectRepository;
use App\Services\ImageProcessor;

final class AdminProjectController extends Controller
{
    public function index(): void
    {
        Auth::requireAdmin($this->config);
        $repo = new ProjectRepository($this->config);
        $page = max(1, (int)($_GET['page'] ?? 1));
        $perPage = 15;
        $search = trim((string)($_GET['search'] ?? ''));
        $projects = $repo->allPaginated($page, $perPage, $search !== '' ? $search : null);
        $total = $repo->countSearch($search !== '' ? $search : null);
        $pages = (int) ceil($total / $perPage);
        $success = Session::flash('success');
        $error = Session::flash('error');
        $this->render('admin/projects/index', compact('projects', 'success', 'error', 'page', 'pages', 'search', 'total'), [
            'title' => 'Projets',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function create(): void
    {
        Auth::requireAdmin($this->config);
        $project = ['id' => null, 'title' => '', 'stack' => [], 'description' => '', 'github' => '', 'link' => ''];
        $this->render('admin/projects/form', compact('project'), [
            'title' => 'Nouveau projet',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function store(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/projects');
        }
        $title = trim((string)($_POST['title'] ?? ''));
        $stackInput = $_POST['stack'] ?? '';
        $description = trim((string)($_POST['description'] ?? ''));
        $github = trim((string)($_POST['github'] ?? ''));
        $link = trim((string)($_POST['link'] ?? ''));

        if ($title === '' || mb_strlen($title) < 3) {
            Session::flash('error', 'Le titre doit contenir au moins 3 caractères.');
            $this->redirect('/admin/projects/create');
        }
        if (is_array($stackInput)) {
            $stack = array_values(array_filter(array_map('trim', $stackInput), fn($v) => $v !== ''));
        } else {
            $stackStr = trim((string)$stackInput);
            $stack = array_values(array_filter(array_map('trim', explode(',', $stackStr)), fn($v) => $v !== ''));
        }
        $imagePath = null;
        if (isset($_FILES['image']) && is_array($_FILES['image']) && (int)($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
            // Check GD extension before processing
            if (!extension_loaded('gd')) {
                Session::flash('error', 'L\'extension GD n\'est pas activée sur ce serveur. Veuillez contacter votre administrateur système pour activer l\'extension GD dans PHP.');
                $this->redirect('/admin/projects/create');
                return;
            }
            
            $tmp = (string) ($_FILES['image']['tmp_name'] ?? '');
            $size = (int) ($_FILES['image']['size'] ?? 0);
            if ($size > 2 * 1024 * 1024) {
                Session::flash('error', 'Image trop volumineuse (max 2 Mo).');
                $this->redirect('/admin/projects/create');
            }
            if (!is_uploaded_file($tmp)) {
                Session::flash('error', 'Upload de fichier invalide.');
                $this->redirect('/admin/projects/create');
            }
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = $finfo ? (string) finfo_file($finfo, $tmp) : '';
            if ($finfo) { finfo_close($finfo); }
            $map = [
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                'image/webp' => 'webp',
                'image/gif' => 'gif',
            ];
            if (!isset($map[$mime])) {
                Session::flash('error', 'Format d\'image non supporté.');
                $this->redirect('/admin/projects/create');
            }
            $ext = $map[$mime];
            $nameBase = (string) (time() . '_' . bin2hex(random_bytes(8)));
            $webRoot = defined('PUBLIC_PATH') ? PUBLIC_PATH : (BASE_PATH . DIRECTORY_SEPARATOR . 'public');
            $uploadDir = $webRoot . DIRECTORY_SEPARATOR . 'uploads';
            if (!is_dir($uploadDir)) { @mkdir($uploadDir, 0775, true); }
            $originalPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '.' . $ext;
            $resizedPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '_resized.' . $ext;
            $thumbPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '_thumb.jpg';
            if (!@move_uploaded_file($tmp, $originalPath)) {
                Session::flash('error', 'Impossible d\'enregistrer l\'image.');
                $this->redirect('/admin/projects/create');
            }
            try {
                ImageProcessor::resizeAndCompress($originalPath, $resizedPath, 1200, 800, 85);
                ImageProcessor::createThumbnail($originalPath, $thumbPath, 300);
                @unlink($originalPath);
                
                // Use thumbnail for display since resize might fail
                if (file_exists($thumbPath)) {
                    $imagePath = 'uploads/' . $nameBase . '_thumb.jpg';
                } elseif (file_exists($resizedPath)) {
                    $imagePath = 'uploads/' . $nameBase . '_resized.' . $ext;
                } else {
                    Session::flash('error', 'Erreur: Aucune image n\'a pu être créée.');
                    $this->redirect('/admin/projects/create');
                    return;
                }
            } catch (\RuntimeException $e) {
                @unlink($originalPath);
                Session::flash('error', 'Erreur lors du traitement de l\'image.');
                $this->redirect('/admin/projects/create');
            }
        }
        $repo = new ProjectRepository($this->config);
        $repo->create($title, $stack, $description ?: null, $github ?: null, $link ?: null, $imagePath, trim((string)($_POST['image_alt'] ?? null) ?: null));
        Session::flash('success', 'Projet créé avec succès.');
        $this->redirect('/admin/projects');
    }

    public function edit(): void
    {
        Auth::requireAdmin($this->config);
        $id = (int)($_GET['id'] ?? 0);
        $repo = new ProjectRepository($this->config);
        $project = $repo->find($id);
        if (!$project) {
            Session::flash('error', 'Projet introuvable.');
            $this->redirect('/admin/projects');
        }
        $this->render('admin/projects/form', compact('project'), [
            'title' => 'Modifier le projet',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function update(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/projects');
        }
        $id = (int)($_POST['id'] ?? 0);
        $title = trim((string)($_POST['title'] ?? ''));
        $stackInput = $_POST['stack'] ?? '';
        $description = trim((string)($_POST['description'] ?? ''));
        $github = trim((string)($_POST['github'] ?? ''));
        $link = trim((string)($_POST['link'] ?? ''));
        if ($id <= 0) {
            Session::flash('error', 'ID invalide.');
            $this->redirect('/admin/projects');
        }
        if ($title === '' || mb_strlen($title) < 3) {
            Session::flash('error', 'Le titre doit contenir au moins 3 caractères.');
            $this->redirect('/admin/projects/edit?id=' . $id);
        }
        if (is_array($stackInput)) {
            $stack = array_values(array_filter(array_map('trim', $stackInput), fn($v) => $v !== ''));
        } else {
            $stackStr = trim((string)$stackInput);
            $stack = array_values(array_filter(array_map('trim', explode(',', $stackStr)), fn($v) => $v !== ''));
        }
        $repo = new ProjectRepository($this->config);
        $existing = $repo->find($id);
        $imagePath = $existing['image'] ?? null;
        if (isset($_FILES['image']) && is_array($_FILES['image']) && (int)($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
            // Check GD extension before processing
            if (!extension_loaded('gd')) {
                Session::flash('error', 'L\'extension GD n\'est pas activée sur ce serveur. Veuillez contacter votre administrateur système pour activer l\'extension GD dans PHP.');
                $this->redirect('/admin/projects/edit?id=' . $id);
                return;
            }
            
            $tmp = (string) ($_FILES['image']['tmp_name'] ?? '');
            $size = (int) ($_FILES['image']['size'] ?? 0);
            if ($size > 2 * 1024 * 1024) {
                Session::flash('error', 'Image trop volumineuse (max 2 Mo).');
                $this->redirect('/admin/projects/edit?id=' . $id);
            }
            if (!is_uploaded_file($tmp)) {
                Session::flash('error', 'Upload de fichier invalide.');
                $this->redirect('/admin/projects/edit?id=' . $id);
            }
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = $finfo ? (string) finfo_file($finfo, $tmp) : '';
            if ($finfo) { finfo_close($finfo); }
            $map = [
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                'image/webp' => 'webp',
                'image/gif' => 'gif',
            ];
            if (!isset($map[$mime])) {
                Session::flash('error', 'Format d\'image non supporté.');
                $this->redirect('/admin/projects/edit?id=' . $id);
            }
            $ext = $map[$mime];
            $nameBase = (string) (time() . '_' . bin2hex(random_bytes(8)));
            $webRoot = defined('PUBLIC_PATH') ? PUBLIC_PATH : (BASE_PATH . DIRECTORY_SEPARATOR . 'public');
            $uploadDir = $webRoot . DIRECTORY_SEPARATOR . 'uploads';
            if (!is_dir($uploadDir)) { @mkdir($uploadDir, 0775, true); }
            $originalPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '.' . $ext;
            $resizedPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '_resized.' . $ext;
            $thumbPath = $uploadDir . DIRECTORY_SEPARATOR . $nameBase . '_thumb.jpg';
            if (!@move_uploaded_file($tmp, $originalPath)) {
                Session::flash('error', 'Impossible d\'enregistrer l\'image.');
                $this->redirect('/admin/projects/edit?id=' . $id);
            }
            try {
                ImageProcessor::resizeAndCompress($originalPath, $resizedPath, 1200, 800, 85);
                ImageProcessor::createThumbnail($originalPath, $thumbPath, 300);
                @unlink($originalPath);
                
                // Use thumbnail for display since resize might fail
                if (file_exists($thumbPath)) {
                    $newImagePath = 'uploads/' . $nameBase . '_thumb.jpg';
                } elseif (file_exists($resizedPath)) {
                    $newImagePath = 'uploads/' . $nameBase . '_resized.' . $ext;
                } else {
                    Session::flash('error', 'Erreur: Aucune image n\'a pu être créée.');
                    $this->redirect('/admin/projects/edit?id=' . $id);
                    return;
                }
            } catch (\RuntimeException $e) {
                @unlink($originalPath);
                Session::flash('error', 'Erreur lors du traitement de l\'image: ' . $e->getMessage());
                $this->redirect('/admin/projects/edit?id=' . $id);
            }
        } else {
            $newImagePath = null;
        }
        
        // Delete OLD image (previous one) if a new one has been uploaded successfully
        if (!empty($newImagePath) && !empty($imagePath)) {
            $webRoot = defined('PUBLIC_PATH') ? PUBLIC_PATH : (BASE_PATH . DIRECTORY_SEPARATOR . 'public');
            $oldFullPath = $webRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, (string)$imagePath);
            if (is_file($oldFullPath)) { @unlink($oldFullPath); }

            // Also attempt to delete the counterpart (thumb/resized) of the old image
            // If old was a resized variant, delete its thumb; if old was a thumb, delete its resized
            $oldThumbCandidate = preg_replace('/_resized\.[^.]+$/', '_thumb.jpg', (string)$imagePath);
            $oldResizedCandidate = preg_replace('/_thumb\.jpg$/', '_resized.' . pathinfo((string)$imagePath, PATHINFO_EXTENSION), (string)$imagePath);

            // Build full paths within uploads dir
            $uploadDir = $webRoot . DIRECTORY_SEPARATOR . 'uploads';
            $oldThumbFull = $uploadDir . DIRECTORY_SEPARATOR . basename((string)$oldThumbCandidate);
            $oldResizedFull = $uploadDir . DIRECTORY_SEPARATOR . basename((string)$oldResizedCandidate);

            if (is_file($oldThumbFull)) { @unlink($oldThumbFull); }
            if (is_file($oldResizedFull)) { @unlink($oldResizedFull); }
        }

        // Now persist the new image path (thumb or resized)
        $imagePath = $newImagePath;
        
        $repo->update($id, $title, $stack, $description ?: null, $github ?: null, $link ?: null, $imagePath, trim((string)($_POST['image_alt'] ?? null) ?: null));
        Session::flash('success', 'Projet mis à jour.');
        $this->redirect('/admin/projects');
    }

    public function delete(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/projects');
        }
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $repo = new ProjectRepository($this->config);
            $existing = $repo->find($id);
            if ($existing && !empty($existing['image'])) {
                $webRoot = defined('PUBLIC_PATH') ? PUBLIC_PATH : (BASE_PATH . DIRECTORY_SEPARATOR . 'public');
                $full = $webRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, (string)$existing['image']);
                if (is_file($full)) { @unlink($full); }
                // Also delete thumbnail
                $thumbBase = str_replace(['uploads/', '_resized.'], ['', '_thumb.'], (string)$existing['image']);
                $thumbBase = pathinfo($thumbBase, PATHINFO_FILENAME) . '_thumb.jpg';
                $thumbFullPath = $webRoot . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $thumbBase;
                if (is_file($thumbFullPath)) { @unlink($thumbFullPath); }
            }
            $repo->delete($id);
            Session::flash('success', 'Projet supprimé.');
        }
        $this->redirect('/admin/projects');
    }
}
