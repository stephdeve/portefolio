import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills: { name: string; level: number; logo: string; category: string }[] = [
      // 💻 Développement Web
      { name: 'HTML5 / CSS3', level: 92, logo: 'html', category: 'web' },
      { name: 'JavaScript', level: 90, logo: 'javascript', category: 'web' },
      { name: 'React / Next.js', level: 78, logo: 'react', category: 'web' },
      { name: 'TypeScript', level: 75, logo: 'typescript', category: 'web' },
      { name: 'Tailwind CSS', level: 85, logo: 'tailwind', category: 'web' },
      { name: 'PHP', level: 95, logo: 'php', category: 'web' },
      { name: 'MySQL', level: 85, logo: 'mysql', category: 'web' },
      { name: 'REST APIs', level: 88, logo: 'rest', category: 'web' },

      // 📱 Développement Mobile
      { name: 'Flutter / Dart', level: 72, logo: 'figma', category: 'mobile' },
      { name: 'SQLite', level: 70, logo: 'database', category: 'mobile' },
      { name: 'API mobile', level: 80, logo: 'rest', category: 'mobile' },
      { name: 'UI responsive mobile', level: 75, logo: 'figma', category: 'mobile' },

      // ☁️ Cloud & DevOps
      { name: 'Docker', level: 80, logo: 'docker', category: 'cloud' },
      { name: 'Kubernetes', level: 65, logo: 'kubernetes', category: 'cloud' },
      { name: 'AWS', level: 70, logo: 'aws', category: 'cloud' },
      { name: 'CI/CD (GitHub Actions)', level: 75, logo: 'github', category: 'cloud' },
      { name: 'Linux', level: 80, logo: 'linux', category: 'cloud' },

      // 🧰 Outils & Technologies
      { name: 'Git / GitHub', level: 88, logo: 'git', category: 'tools' },
      { name: 'VS Code', level: 90, logo: 'figma', category: 'tools' },
      { name: 'Postman', level: 82, logo: 'rest', category: 'tools' },
      { name: 'Docker Desktop', level: 80, logo: 'docker', category: 'tools' },
      { name: 'UML / PlantUML', level: 75, logo: 'figma', category: 'tools' },
      { name: 'Redis', level: 68, logo: 'database', category: 'tools' },
      { name: 'PostgreSQL', level: 78, logo: 'database', category: 'tools' },

      // 🧠 Soft Skills
      { name: 'Résolution de problèmes', level: 0, logo: '', category: 'soft' },
      { name: 'Esprit d\'analyse', level: 0, logo: '', category: 'soft' },
      { name: 'Autonomie', level: 0, logo: '', category: 'soft' },
      { name: 'Apprentissage continu', level: 0, logo: '', category: 'soft' },
      { name: 'Adaptabilité', level: 0, logo: '', category: 'soft' },
      { name: 'Rigueur', level: 0, logo: '', category: 'soft' },
      { name: 'Esprit d\'innovation', level: 0, logo: '', category: 'soft' },
      { name: 'Travail en équipe', level: 0, logo: '', category: 'soft' },
      { name: 'Communication technique', level: 0, logo: '', category: 'soft' },
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
