<?php
declare(strict_types=1);

namespace App\Core;

abstract class Controller
{
    protected View $view;
    protected array $config;

    public function __construct(array $config = [])
    {
        $this->config = $config;
        $this->view = new View($config);
    }

    protected function render(string $template, array $data = [], array $meta = []): void
    {
        echo $this->view->render($template, $data, $meta);
    }

    protected function redirect(string $path): void
    {
        $base = $this->config['app']['base_url'] ?? '';
        header('Location: ' . rtrim($base, '/') . $path);
        exit;
    }

    protected function json(mixed $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
}
