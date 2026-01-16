<?php
declare(strict_types=1);

namespace App\Services;

use Exception;

final class Mailer
{
    public function __construct(private array $config)
    {
    }

    public function send(string $to, string $subject, string $htmlBody, ?string $textBody = null): bool
    {
        if (class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
            return $this->sendWithPHPMailer($to, $subject, $htmlBody, $textBody);
        }
        // Fallback: no mailer installed; pretend sent but actually not
        return false;
    }

    private function sendWithPHPMailer(string $to, string $subject, string $htmlBody, ?string $textBody = null): bool
    {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $cfg = $this->config['mail'] ?? [];
        $from = $cfg['from'] ?? 'no-reply@example.com';
        $fromName = $cfg['from_name'] ?? 'Portfolio';

        try {
            $host = (string)($cfg['host'] ?? '');
            if ($host !== '') {
                $mail->isSMTP();
                $mail->Host = $host;
                $mail->SMTPAuth = ($cfg['user'] ?? '') !== '';
                $mail->Username = (string)($cfg['user'] ?? '');
                $mail->Password = (string)($cfg['pass'] ?? '');
                $encryption = (string)($cfg['encryption'] ?? 'tls');
                if (in_array($encryption, ['tls','ssl'], true)) {
                    $mail->SMTPSecure = $encryption;
                }
                $mail->Port = (int)($cfg['port'] ?? 587);
            } else {
                $mail->isMail();
            }

            $mail->CharSet = 'UTF-8';
            $mail->setFrom($from, $fromName);
            $mail->addAddress($to);
            $mail->Subject = $subject;
            $mail->isHTML(true);
            $mail->Body = $htmlBody;
            $mail->AltBody = $textBody ?? strip_tags($htmlBody);
            return $mail->send();
        } catch (Exception) {
            return false;
        }
    }
}
