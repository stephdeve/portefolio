<?php
declare(strict_types=1);

namespace App\Services;

use RuntimeException;

final class ImageProcessor
{
    /**
     * Resize and compress an uploaded image to a max width/height and quality.
     * Returns the new file path or throws on failure.
     *
     * @param string $sourcePath Uploaded file temporary path
     * @param string $destPath Destination path (including filename)
     * @param int $maxWidth Max width in pixels (default 1200)
     * @param int $maxHeight Max height in pixels (default 800)
     * @param int $quality Quality for JPEG (0-100, default 85)
     * @return void
     * @throws RuntimeException
     */
    public static function resizeAndCompress(string $sourcePath, string $destPath, int $maxWidth = 1200, int $maxHeight = 800, int $quality = 85): void
    {
        if (!extension_loaded('gd')) {
            throw new RuntimeException('L\'extension GD est requise pour le traitement des images. Veuillez l\'activer dans php.ini.');
        }

        // Check if GD functions are available
        $requiredFunctions = ['getimagesize', 'imagecreatefromjpeg', 'imagecreatefrompng', 'imagecreatetruecolor', 'imagecopyresampled', 'imagejpeg'];
        foreach ($requiredFunctions as $func) {
            if (!function_exists($func)) {
                throw new RuntimeException("La fonction GD '{$func}' n'est pas disponible. Vérifiez votre installation PHP.");
            }
        }

        $info = getimagesize($sourcePath);
        if ($info === false) {
            throw new RuntimeException('Invalid image.');
        }

        $mime = $info['mime'];
        $src = null;
        switch ($mime) {
            case 'image/jpeg':
                $src = imagecreatefromjpeg($sourcePath);
                break;
            case 'image/png':
                $src = imagecreatefrompng($sourcePath);
                break;
            case 'image/webp':
                $src = imagecreatefromwebp($sourcePath);
                break;
            case 'image/gif':
                $src = imagecreatefromgif($sourcePath);
                break;
            default:
                throw new RuntimeException('Unsupported image type.');
        }
        if ($src === false) {
            throw new RuntimeException('Failed to load image.');
        }

        $origWidth = imagesx($src);
        $origHeight = imagesy($src);

        // Calculate new dimensions maintaining aspect ratio
        $ratio = min($maxWidth / $origWidth, $maxHeight / $origHeight, 1);
        $newWidth = (int) round($origWidth * $ratio);
        $newHeight = (int) round($origHeight * $ratio);

        $dst = imagecreatetruecolor($newWidth, $newHeight);
        if ($dst === false) {
            imagedestroy($src);
            throw new RuntimeException('Failed to create new image.');
        }

        // Preserve transparency for PNG/GIF
        if ($mime === 'image/png' || $mime === 'image/gif') {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            $transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
            imagefilledrectangle($dst, 0, 0, $newWidth, $newHeight, $transparent);
        }

        $resized = imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
        imagedestroy($src);
        if (!$resized) {
            imagedestroy($dst);
            throw new RuntimeException('Failed to resize image.');
        }

        // Save
        switch ($mime) {
            case 'image/jpeg':
                $saved = imagejpeg($dst, $destPath, $quality);
                break;
            case 'image/png':
                $saved = imagepng($dst, $destPath, (int) round($quality / 11)); // PNG quality is 0-9
                break;
            case 'image/webp':
                $saved = imagewebp($dst, $destPath, $quality);
                break;
            case 'image/gif':
                $saved = imagegif($dst, $destPath);
                break;
            default:
                imagedestroy($dst);
                throw new RuntimeException('Unsupported save format.');
        }

        imagedestroy($dst);
        if (!$saved) {
            throw new RuntimeException('Failed to save image.');
        }
    }

    /**
     * Create a thumbnail (square) from an image.
     *
     * @param string $sourcePath
     * @param string $destPath
     * @param int $thumbSize Width and height of the square thumbnail (default 300)
     * @return void
     * @throws RuntimeException
     */
    public static function createThumbnail(string $sourcePath, string $destPath, int $thumbSize = 300): void
    {
        if (!extension_loaded('gd')) {
            throw new RuntimeException('GD extension not loaded.');
        }

        $info = getimagesize($sourcePath);
        if ($info === false) {
            throw new RuntimeException('Invalid image.');
        }

        $mime = $info['mime'];
        $src = null;
        switch ($mime) {
            case 'image/jpeg':
                $src = imagecreatefromjpeg($sourcePath);
                break;
            case 'image/png':
                $src = imagecreatefrompng($sourcePath);
                break;
            case 'image/webp':
                $src = imagecreatefromwebp($sourcePath);
                break;
            case 'image/gif':
                $src = imagecreatefromgif($sourcePath);
                break;
            default:
                throw new RuntimeException('Unsupported image type.');
        }
        if ($src === false) {
            throw new RuntimeException('Failed to load image.');
        }

        $origWidth = imagesx($src);
        $origHeight = imagesy($src);

        // Crop to square from center
        $size = min($origWidth, $origHeight);
        $x = (int) round(($origWidth - $size) / 2);
        $y = (int) round(($origHeight - $size) / 2);

        $thumb = imagecreatetruecolor($thumbSize, $thumbSize);
        if ($thumb === false) {
            imagedestroy($src);
            throw new RuntimeException('Failed to create thumbnail.');
        }

        // Preserve transparency for PNG/GIF
        if ($mime === 'image/png' || $mime === 'image/gif') {
            imagealphablending($thumb, false);
            imagesavealpha($thumb, true);
            $transparent = imagecolorallocatealpha($thumb, 255, 255, 255, 127);
            imagefilledrectangle($thumb, 0, 0, $thumbSize, $thumbSize, $transparent);
        }

        $resized = imagecopyresampled($thumb, $src, 0, 0, $x, $y, $thumbSize, $thumbSize, $size, $size);
        imagedestroy($src);
        if (!$resized) {
            imagedestroy($thumb);
            throw new RuntimeException('Failed to create thumbnail.');
        }

        // Save as JPEG for consistency
        $saved = imagejpeg($thumb, $destPath, 85);
        imagedestroy($thumb);
        if (!$saved) {
            throw new RuntimeException('Failed to save thumbnail.');
        }
    }
}
