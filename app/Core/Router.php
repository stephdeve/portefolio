<?php
declare(strict_types=1);

namespace App\Core;

final class Router
{
    /** @var array<string, array<string, callable|array>> */
    private array $routes = [
        'GET' => [],
        'POST' => [],
    ];

    /** @var callable|null */
    private $notFound = null;

    /** @var array */
    private array $config;

    public function __construct(array $config = [])
    {
        $this->config = $config;
    }

    /**
     * @param callable|array{0:class-string,1:string} $handler
     */
    public function get(string $path, callable|array $handler): void
    {
        $this->routes['GET'][$this->normalize($path)] = $handler;
    }

    /**
     * @param callable|array{0:class-string,1:string} $handler
     */
    public function post(string $path, callable|array $handler): void
    {
        $this->routes['POST'][$this->normalize($path)] = $handler;
    }

    public function setNotFound(callable $handler): void
    {
        $this->notFound = $handler;
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $path = $this->normalize($path);

        $handler = $this->routes[$method][$path] ?? null;
        if (!$handler) {
            if ($this->notFound) {
                call_user_func($this->notFound);
                return;
            }
            http_response_code(404);
            echo '404 Not Found';
            return;
        }

        if (is_array($handler)) {
            [$class, $methodName] = $handler;
            $controller = new $class($this->config);
            $controller->{$methodName}();
            return;
        }

        call_user_func($handler);
    }

    private function normalize(string $path): string
    {
        $path = '/' . ltrim($path, '/');
        if ($path !== '/' && str_ends_with($path, '/')) {
            $path = rtrim($path, '/');
        }
        return $path;
    }
}
