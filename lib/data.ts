import { prisma } from './prisma';
import type { Prisma } from '@prisma/client';

export interface ProjectView {
  id: number;
  title: string;
  stack: string[];
  description: string;
  github: string;
  link: string;
  image: string | null;
  imageAlt: string | null;
}

export interface SkillView {
  id: number;
  name: string;
  level: number;
  logo: string | null;
  category: string | null;
}

/** Normalises the Json stack column to a string[]. */
export function normalizeStack(stack: Prisma.JsonValue | null | undefined): string[] {
  if (Array.isArray(stack)) {
    return stack.filter((s): s is string => typeof s === 'string');
  }
  if (typeof stack === 'string' && stack.trim() !== '') {
    try {
      const parsed = JSON.parse(stack);
      if (Array.isArray(parsed)) return parsed.filter((s) => typeof s === 'string');
    } catch {
      /* ignore */
    }
  }
  return [];
}

function toProjectView(p: {
  id: number;
  title: string;
  stack: Prisma.JsonValue | null;
  description: string | null;
  github: string | null;
  link: string | null;
  image: string | null;
  imageAlt: string | null;
}): ProjectView {
  return {
    id: p.id,
    title: p.title,
    stack: normalizeStack(p.stack),
    description: p.description ?? '',
    github: p.github ?? '',
    link: p.link ?? '',
    image: p.image,
    imageAlt: p.imageAlt,
  };
}

export async function getProjects(): Promise<ProjectView[]> {
  const rows = await prisma.project.findMany({ orderBy: { id: 'desc' } });
  return rows.map(toProjectView);
}

export async function getProject(id: number): Promise<ProjectView | null> {
  const row = await prisma.project.findUnique({ where: { id } });
  return row ? toProjectView(row) : null;
}

export async function getProjectsPaginated(
  page: number,
  perPage: number,
  search: string | null,
): Promise<{ projects: ProjectView[]; total: number }> {
  const where: Prisma.ProjectWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};
  const [rows, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: Math.max(0, (page - 1) * perPage),
      take: perPage,
    }),
    prisma.project.count({ where }),
  ]);
  return { projects: rows.map(toProjectView), total };
}

export async function getSkills(): Promise<SkillView[]> {
  const rows = await prisma.skill.findMany({
    orderBy: [{ level: 'desc' }, { name: 'asc' }],
  });
  return rows.map((s) => ({ id: s.id, name: s.name, level: s.level, logo: s.logo, category: s.category }));
}

export async function getTopSkills(limit: number): Promise<SkillView[]> {
  const rows = await prisma.skill.findMany({
    orderBy: [{ level: 'desc' }, { name: 'asc' }],
    take: limit,
  });
  return rows.map((s) => ({ id: s.id, name: s.name, level: s.level, logo: s.logo, category: s.category }));
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string | null): Promise<void> {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
