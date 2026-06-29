import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mirrors the original PHP Migrator::seed() — only seeds when tables are empty.
async function main() {
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills: { name: string; level: number; logo: string | null }[] = [
      { name: 'PHP', level: 95, logo: 'php' },
      { name: 'JavaScript', level: 90, logo: 'javascript' },
      { name: 'MySQL', level: 85, logo: 'mysql' },
      { name: 'HTML5/CSS3', level: 92, logo: 'html' },
      { name: 'REST APIs', level: 85, logo: 'rest' },
      { name: 'Git', level: 88, logo: 'git' },
      { name: 'Linux', level: 80, logo: 'linux' },
      { name: 'Docker', level: 80, logo: 'docker' },
      { name: 'Kubernetes', level: 65, logo: 'kubernetes' },
      { name: 'AWS', level: 70, logo: 'aws' },
      { name: 'GitHub Actions', level: 75, logo: 'github' },
      { name: 'CI/CD', level: 80, logo: 'cicd' },
    ];
    await prisma.skill.createMany({ data: skills });
    console.log(`Seeded ${skills.length} skills.`);
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects: [string, string[], string, string, string][] = [
      [
        'CMS léger PHP',
        ['PHP 8', 'PDO', 'Tailwind'],
        'Un CMS minimaliste en PHP natif avec routing, ORM léger et thèmes.',
        'https://github.com/username/cms-php',
        '#',
      ],
      [
        'API REST en PHP',
        ['PHP 8', 'JWT', 'MySQL'],
        'API RESTful performante avec authentification JWT et tests.',
        'https://github.com/username/api-php',
        '#',
      ],
      [
        'Portfolio React + API',
        ['React', 'PHP', 'MySQL'],
        'SPA React consommant une API PHP pour les projets et le blog.',
        'https://github.com/username/portfolio-react-php',
        '#',
      ],
    ];
    for (const [title, stack, description, github, link] of projects) {
      await prisma.project.create({
        data: { title, stack, description, github, link },
      });
    }
    console.log(`Seeded ${projects.length} projects.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
