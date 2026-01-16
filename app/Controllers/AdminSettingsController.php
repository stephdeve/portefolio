<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Core\Controller;
use App\Core\Csrf;
use App\Core\Session;
use App\Repositories\SettingsRepository;
use App\Services\ImageProcessor;

final class AdminSettingsController extends Controller
{
    public function index(): void
    {
        Auth::requireAdmin($this->config);
        $repo = new SettingsRepository($this->config);
        $profileImage = $repo->get('home.profile_image');
        $profileImageAlt = $repo->get('home.profile_image_alt');
        $success = Session::flash('success');
        $error = Session::flash('error');
        $this->render('admin/settings/index', compact('profileImage', 'profileImageAlt', 'success', 'error'), [
            'title' => 'Paramètres',
            'layout' => 'layouts' . DIRECTORY_SEPARATOR . 'admin.php',
        ]);
    }

    public function updateProfileImage(): void
    {
        Auth::requireAdmin($this->config);
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            Session::flash('error', 'Jeton CSRF invalide.');
            $this->redirect('/admin/settings');
        }

        $alt = trim((string)($_POST['image_alt'] ?? '')) ?: null;
        $repo = new SettingsRepository($this->config);

        if (!isset($_FILES['image']) || !is_array($_FILES['image']) || (int)($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            // Allow updating only alt
            $repo->set('home.profile_image_alt', $alt);
            Session::flash('success', 'Paramètres mis à jour.');
            $this->redirect('/admin/settings');
        }

        // Check GD
        if (!extension_loaded('gd')) {
            Session::flash('error', "L'extension GD n'est pas activée sur ce serveur.");
            $this->redirect('/admin/settings');
        }

        $tmp = (string) ($_FILES['image']['tmp_name'] ?? '');
        $size = (int) ($_FILES['image']['size'] ?? 0);
        if ($size > 2 * 1024 * 1024) {
            Session::flash('error', 'Image trop volumineuse (max 2 Mo).');
            $this->redirect('/admin/settings');
        }
        if (!is_uploaded_file($tmp)) {
            Session::flash('error', 'Upload de fichier invalide.');
            $this->redirect('/admin/settings');
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
            Session::flash('error', "Format d'image non supporté.");
            $this->redirect('/admin/settings');
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
            Session::flash('error', "Impossible d'enregistrer l'image.");
            $this->redirect('/admin/settings');
        }

        try {
            // Create a large resized version and a square thumbnail for consistency on home
            ImageProcessor::resizeAndCompress($originalPath, $resizedPath, 1200, 1200, 85);
            ImageProcessor::createThumbnail($originalPath, $thumbPath, 480);
            @unlink($originalPath);

            $imagePath = null;
            if (file_exists($thumbPath)) {
                $imagePath = 'uploads/' . $nameBase . '_thumb.jpg';
            } elseif (file_exists($resizedPath)) {
                $imagePath = 'uploads/' . $nameBase . '_resized.' . $ext;
            } else {
                Session::flash('error', "Erreur: Aucune image n'a pu être créée.");
                $this->redirect('/admin/settings');
            }

            // Delete previous image file if present
            $prev = $repo->get('home.profile_image');
            if (!empty($prev)) {
                $oldFull = $webRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, (string)$prev);
                if (is_file($oldFull)) { @unlink($oldFull); }
            }

            $repo->set('home.profile_image', $imagePath);
            $repo->set('home.profile_image_alt', $alt);

            // Also copy to the static path used by the homepage image for immediate effect
            try {
                $sourceFile = $webRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, (string)$imagePath);
                $targetDir = $webRoot . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images';
                if (!is_dir($targetDir)) { @mkdir($targetDir, 0775, true); }
                $targetFile = $targetDir . DIRECTORY_SEPARATOR . 'profile.jpg';
                if (is_file($sourceFile)) { @copy($sourceFile, $targetFile); }
            } catch (\Throwable) { /* ignore copy errors */ }
            Session::flash('success', 'Photo mise à jour.');
            $this->redirect('/admin/settings');
        } catch (\RuntimeException $e) {
            @unlink($originalPath);
            Session::flash('error', 'Erreur lors du traitement: ' . $e->getMessage());
            $this->redirect('/admin/settings');
        }
    }
}
