<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\ContactRepository;
use App\Services\Mailer;
use App\Core\Csrf;

final class ContactController extends Controller
{
    public function index(): void
    {
        $success = isset($_GET['success']);
        $errors = [];
        $old = ['name' => '', 'email' => '', 'message' => ''];

        // Public contact info from configuration
        $owner = $this->config['owner'] ?? [];
        $contact = [
            'email' => (string)($owner['email'] ?? ''),
            'location' => (string)($owner['location'] ?? ''),
            'availability' => (string)($owner['availability'] ?? ''),
            'github' => (string)($owner['github'] ?? ''),
            'linkedin' => (string)($owner['linkedin'] ?? ''),
            'twitter' => (string)($owner['twitter'] ?? ''),
            'facebook' => (string)($owner['facebook'] ?? ''),
            'whatsapp' => (string)($owner['whatsapp'] ?? ''),
        ];

        $this->render('contact', compact('success', 'errors', 'old', 'contact'), [
            'title' => 'Contact',
            'description' => 'Me contacter pour une collaboration ou une opportunité.',
        ]);
    }

    public function submit(): void
    {
        if (!Csrf::check($_POST['_csrf'] ?? null)) {
            $success = false;
            $errors = ['global' => 'Jeton CSRF invalide.'];
            $old = [
                'name' => trim((string)($_POST['name'] ?? '')),
                'email' => trim((string)($_POST['email'] ?? '')),
                'message' => trim((string)($_POST['message'] ?? '')),
            ];
            $owner = $this->config['owner'] ?? [];
            $contact = [
                'email' => (string)($owner['email'] ?? ''),
                'location' => (string)($owner['location'] ?? ''),
                'availability' => (string)($owner['availability'] ?? ''),
                'github' => (string)($owner['github'] ?? ''),
                'linkedin' => (string)($owner['linkedin'] ?? ''),
                'twitter' => (string)($owner['twitter'] ?? ''),
                'facebook' => (string)($owner['facebook'] ?? ''),
                'whatsapp' => (string)($owner['whatsapp'] ?? ''),
            ];
            $this->render('contact', compact('success', 'errors', 'old', 'contact'), [
                'title' => 'Contact',
            ]);
            return;
        }
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $message = trim($_POST['message'] ?? '');

        $errors = [];
        if ($name === '' || mb_strlen($name) < 2) {
            $errors['name'] = 'Nom invalide.';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email invalide.';
        }
        if ($message === '' || mb_strlen($message) < 10) {
            $errors['message'] = 'Message trop court.';
        }

        if ($errors) {
            $old = ['name' => $name, 'email' => $email, 'message' => $message];
            $success = false;
            $owner = $this->config['owner'] ?? [];
            $contact = [
                'email' => (string)($owner['email'] ?? ''),
                'location' => (string)($owner['location'] ?? ''),
                'availability' => (string)($owner['availability'] ?? ''),
                'github' => (string)($owner['github'] ?? ''),
                'linkedin' => (string)($owner['linkedin'] ?? ''),
                'twitter' => (string)($owner['twitter'] ?? ''),
                'facebook' => (string)($owner['facebook'] ?? ''),
                'whatsapp' => (string)($owner['whatsapp'] ?? ''),
            ];
            $this->render('contact', compact('success', 'errors', 'old', 'contact'), [
                'title' => 'Contact',
            ]);
            return;
        }

        // Store contact with error handling
        $repo = new ContactRepository($this->config);
        try {
            $repo->create($name, $email, $message);
        } catch (\Throwable $e) {
            $success = false;
            $errors = ['global' => "Une erreur est survenue lors de l'enregistrement du message. Veuillez réessayer."];
            $old = ['name' => $name, 'email' => $email, 'message' => $message];
            $owner = $this->config['owner'] ?? [];
            $contact = [
                'email' => (string)($owner['email'] ?? ''),
                'location' => (string)($owner['location'] ?? ''),
                'availability' => (string)($owner['availability'] ?? ''),
                'github' => (string)($owner['github'] ?? ''),
                'linkedin' => (string)($owner['linkedin'] ?? ''),
                'twitter' => (string)($owner['twitter'] ?? ''),
                'facebook' => (string)($owner['facebook'] ?? ''),
                'whatsapp' => (string)($owner['whatsapp'] ?? ''),
            ];
            $this->render('contact', compact('success', 'errors', 'old', 'contact'), [
                'title' => 'Contact',
            ]);
            return;
        }

        // Try to send email via Mailer (PHPMailer if available)
        $mailer = new Mailer($this->config);
        $to = (string) ($this->config['mail']['to'] ?? '');
        if ($to !== '') {
            $subject = 'Nouveau message de contact: ' . $name;
            $html = '<p><strong>Nom:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>' .
                    '<p><strong>Email:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</p>' .
                    '<p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>';
            $mailer->send($to, $subject, $html);
        }

        $base = $this->config['app']['base_url'] ?? '';
        header('Location: ' . rtrim($base, '/') . '/contact?success=1');
        exit;
    }
}
