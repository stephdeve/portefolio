<?php
declare(strict_types=1);

namespace App\Core;

final class View
{
    private string $basePath;
    private array $config;

    public function __construct(array $config = [])
    {
        $this->config = $config;
        $this->basePath = realpath(BASE_PATH . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Views') ?: '';
    }

    public function render(string $template, array $params = [], array $meta = []): string
    {
        $templateFile = $this->basePath . DIRECTORY_SEPARATOR . $this->normalize($template) . '.php';
        if (!is_file($templateFile)) {
            http_response_code(500);
            return 'View not found: ' . $template;
        }

        extract($params, EXTR_SKIP);
        $e = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $config = $this->config;

        ob_start();
        include $templateFile;
        $content = ob_get_clean();

        $meta = array_merge([
            'title' => $this->config['app']['name'] ?? 'Portfolio',
            'description' => $this->config['app']['description'] ?? 'Portfolio développeur',
        ], $meta);

        ob_start();
        $config = $this->config;
        $layout = $meta['layout'] ?? ('layouts' . DIRECTORY_SEPARATOR . 'base.php');
        $layoutPath = $this->basePath . DIRECTORY_SEPARATOR . $layout;
        if (!is_file($layoutPath)) {
            $layoutPath = $this->basePath . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . 'base.php';
        }
        include $layoutPath;
        return (string) ob_get_clean();
    }

    private function normalize(string $template): string
    {
        return str_replace(['..', '\\'], ['', '/'], $template);
    }
}
