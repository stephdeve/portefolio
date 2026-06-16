'use client';

import Link from 'next/link';
import { useState } from 'react';

type Action = (formData: FormData) => void | Promise<void>;

export function SkillForm({
  action,
  skill,
}: {
  action: Action;
  skill: { id: number | null; name: string; level: number };
}) {
  const [level, setLevel] = useState(skill.level);

  return (
    <div className="max-w-2xl animate-slide-up">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {skill.id ? 'Modifier la compétence' : 'Nouvelle compétence'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {skill.id ? 'Mettez à jour la compétence.' : 'Ajoutez une nouvelle compétence technique.'}
          </p>
        </div>
        <form action={action} className="p-6 space-y-6">
          {skill.id && <input type="hidden" name="id" value={skill.id} />}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
              Nom de la compétence
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              type="text"
              name="name"
              id="name"
              defaultValue={skill.name}
              required
              placeholder="Ex: PHP, JavaScript, MySQL..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="level">
              Niveau de maîtrise
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <input
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  type="number"
                  name="level"
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                  min={0}
                  max={100}
                  required
                />
                <span className="text-2xl font-bold text-primary">{level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${level}%` }}
                />
              </div>
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
              {skill.id ? 'Mettre à jour' : 'Créer'}
            </button>
            <Link
              className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              href="/admin/skills"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
