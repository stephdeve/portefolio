import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mirrors the original PHP Migrator::seed() — only seeds when tables are empty.
async function main() {
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills: [string, number][] = [
      ['PHP', 95],
      ['JavaScript', 90],
      ['MySQL', 85],
      ['HTML5/CSS3', 92],
      ['Git', 88],
      ['Docker', 75],
      ['Linux', 80],
      ['REST APIs', 85],
    ];
    await prisma.skill.createMany({
      data: skills.map(([name, level]) => ({ name, level })),
    });
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
