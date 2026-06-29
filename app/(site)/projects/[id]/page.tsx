import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProject } from '@/lib/data';
import { assetUrl } from '@/lib/url';
import { FallbackImage } from '@/components/ProfileImage';
import { GITHUB_ICON } from '@/lib/icons';
import { prisma } from '@/lib/prisma';
import { config } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id)) return {};
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return {};
  const baseUrl = config.app.baseUrl || 'https://stephane-dev.vercel.app';
  return {
    title: project.title,
    description: project.description?.slice(0, 160) || 'Détail du projet',
    openGraph: {
      title: project.title,
      description: project.description?.slice(0, 160),
      url: `${baseUrl}/projects/${project.id}`,
      images: project.image ? [{ url: assetUrl(project.image), width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id)) notFound();

  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-950 dark:via-gray-900 dark:to-primary/10">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
          Retour aux projets
        </Link>

        {project.image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-xl relative">
            <FallbackImage
              className="object-cover"
              src={assetUrl(project.image)}
              alt={project.imageAlt || project.title}
              width={1200}
              height={675}
            />
          </div>
        )}

        <header className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {project.description && (
          <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
            {project.description.split('\n').map((line, i) => (
              <p key={i} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {GITHUB_ICON}
              </svg>
              Code source
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90 transition-all text-sm font-medium shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir le projet
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
