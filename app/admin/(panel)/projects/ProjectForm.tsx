'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FallbackImage } from '@/components/ProfileImage';
import { assetUrl } from '@/lib/url';

type Action = (formData: FormData) => void | Promise<void>;

interface ProjectData {
  id: number | null;
  title: string;
  stack: string[];
  description: string;
  github: string;
  link: string;
  image: string | null;
  imageAlt: string | null;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition';

export function ProjectForm({ action, project }: { action: Action; project: ProjectData }) {
  const [techs, setTechs] = useState<string[]>(project.stack.length > 0 ? project.stack : []);

  return (
    <div className="max-w-3xl animate-slide-up">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.id ? 'Modifier le projet' : 'Nouveau projet'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {project.id
              ? 'Mettez à jour les informations du projet.'
              : 'Ajoutez un nouveau projet à votre portfolio.'}
          </p>
        </div>
        <form action={action} className="p-6 space-y-6">
          {project.id && <input type="hidden" name="id" value={project.id} />}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
                Titre
              </label>
              <input className={inputClass} type="text" name="title" id="title" defaultValue={project.title} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="github">
                GitHub
              </label>
              <input className={inputClass} type="url" name="github" id="github" defaultValue={project.github} placeholder="https://github.com/..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="link">
              Lien du projet
            </label>
            <input className={inputClass} type="url" name="link" id="link" defaultValue={project.link} placeholder="https://example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
              Description
            </label>
            <textarea className={inputClass} name="description" id="description" rows={4} defaultValue={project.description} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stack technique</label>
            <div className="space-y-2">
              {techs.map((tech, i) => (
                <div className="flex gap-2" key={i}>
                  <input
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    type="text"
                    name="stack"
                    defaultValue={tech}
                    placeholder="Ex: PHP, JavaScript..."
                  />
                  <button
                    type="button"
                    className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    onClick={() => setTechs((t) => t.filter((_, idx) => idx !== i))}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setTechs((t) => [...t, ''])}
              >
                + Ajouter une technologie
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image de couverture</label>
              <div className="space-y-3">
                <input
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition"
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">Formats : JPEG, PNG, WebP, GIF • Max 2 Mo</p>
                {project.image && (
                  <div className="relative group">
                    <FallbackImage
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
                      src={assetUrl(project.image)}
                      alt="Aperçu"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Image actuelle</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="image_alt">
                Texte alternatif (SEO)
              </label>
              <input
                className={inputClass}
                type="text"
                name="image_alt"
                id="image_alt"
                defaultValue={project.imageAlt ?? ''}
                placeholder="Ex: Capture d'écran du tableau de bord"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Décrit l’image pour l’accessibilité et le référencement
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {project.id ? 'Mettre à jour' : 'Créer'}
            </button>
            <Link
              className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              href="/admin/projects"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
