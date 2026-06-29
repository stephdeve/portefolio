import { prisma } from '@/lib/prisma';
import { config } from '@/lib/config';

const BASE_URL = config.app.baseUrl || 'https://stephane-dev.vercel.app';

export default async function sitemap() {
  const projects = await prisma.project.findMany({ select: { id: true } });

  const projectUrls = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/skills`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    ...projectUrls,
  ];
}
