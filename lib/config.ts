// Centralised configuration read from environment variables.
// Mirrors the original PHP config/config.php structure.

const env = (key: string, fallback = ''): string => process.env[key] ?? fallback;

export interface AppConfig {
  app: {
    name: string;
    description: string;
    baseUrl: string;
    env: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    pass: string;
    encryption: string;
    from: string;
    fromName: string;
    to: string;
  };
  owner: {
    name: string;
    headline: string;
    email: string;
    location: string;
    availability: string;
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
  };
  admin: {
    user: string;
    passHash: string;
  };
}

export function getConfig(): AppConfig {
  const mailTo = env('MAIL_TO', 'owner@example.com');
  return {
    app: {
      name: env('APP_NAME', 'Portfolio'),
      description: env('APP_DESCRIPTION', 'Portfolio professionnel de développeur.'),
      baseUrl: env('APP_URL', ''),
      env: env('APP_ENV', 'production'),
    },
    mail: {
      host: env('SMTP_HOST', ''),
      port: Number(env('SMTP_PORT', '587')),
      user: env('SMTP_USER', ''),
      pass: env('SMTP_PASS', ''),
      encryption: env('SMTP_ENCRYPTION', 'tls'),
      from: env('MAIL_FROM', 'no-reply@example.com'),
      fromName: env('MAIL_FROM_NAME', 'Portfolio'),
      to: mailTo,
    },
    owner: {
      name: env('OWNER_NAME', ''),
      headline: env('OWNER_HEADLINE', 'Développeur backend • Web • Mobile • DevOps'),
      email: env('CONTACT_EMAIL', mailTo),
      location: env('CONTACT_LOCATION', ''),
      availability: env('CONTACT_AVAILABILITY', ''),
      github: env('SOCIAL_GITHUB', ''),
      linkedin: env('SOCIAL_LINKEDIN', ''),
      twitter: env('SOCIAL_TWITTER', ''),
      facebook: env('SOCIAL_FACEBOOK', ''),
      whatsapp: env('SOCIAL_WHATSAPP', ''),
    },
    admin: {
      user: env('ADMIN_USER', ''),
      passHash: env('ADMIN_PASS_HASH', ''),
    },
  };
}

export const config = getConfig();
