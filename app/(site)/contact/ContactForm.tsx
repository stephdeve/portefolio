'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact, type ContactState } from './actions';

const INITIAL: ContactState = { success: false, errors: {}, old: { name: '', email: '', message: '' } };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      {pending ? 'Envoi…' : 'Envoyer le message'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, INITIAL);
  const { errors, old } = state;

  const inputBorder = (field: string) =>
    errors[field] ? 'border-red-500 dark:border-red-700' : 'border-gray-300 dark:border-gray-700';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envoyez un message</h2>

      {state.success && (
        <div className="mb-6 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" role="alert">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Votre message a été envoyé avec succès.</span>
          </div>
        </div>
      )}

      {errors.global && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300" role="alert">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>{errors.global}</span>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6" noValidate>
        {/* Honeypot — invisible for humans */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
            Nom complet
          </label>
          <input
            className={`w-full px-4 py-3 border ${inputBorder('name')} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            type="text"
            name="name"
            id="name"
            required
            minLength={2}
            placeholder="Jean Dupont"
            defaultValue={old.name}
          />
          {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
            Adresse email
          </label>
          <input
            className={`w-full px-4 py-3 border ${inputBorder('email')} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            type="email"
            name="email"
            id="email"
            required
            placeholder="jean@exemple.com"
            defaultValue={old.email}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className={`w-full px-4 py-3 border ${inputBorder('message')} rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
            name="message"
            id="message"
            rows={5}
            required
            minLength={10}
            placeholder="Décrivez votre projet ou votre demande..."
            defaultValue={old.message}
          />
          {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
