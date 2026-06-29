import crypto from 'crypto';
import sharp from 'sharp';
import { put, del } from '@vercel/blob';

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB, same limit as the PHP app

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export interface ProcessOptions {
  /** Target width in px. */
  width: number;
  /** Target height in px. */
  height: number;
  /**
   * "fit"   → resize to fit inside width×height without enlarging (project covers).
   * "cover" → crop to fill a width×height square (profile photo).
   */
  mode: 'fit' | 'cover';
  /** JPEG quality (1-100). */
  quality?: number;
}

export interface ProcessResult {
  /** Public Vercel Blob URL to store and display. */
  imagePath: string;
}

export class ImageError extends Error {}

/**
 * Validates and processes an uploaded image with sharp, then stores it on
 * Vercel Blob. Returns the public blob URL.
 *
 * Requires the BLOB_READ_WRITE_TOKEN environment variable (provided
 * automatically on Vercel when a Blob store is linked to the project).
 */
export async function processImageUpload(
  file: File,
  opts: ProcessOptions,
): Promise<ProcessResult> {
  if (file.size > MAX_SIZE) {
    throw new ImageError('Image trop volumineuse (max 2 Mo).');
  }
  if (!ALLOWED_MIME.has(file.type)) {
    throw new ImageError("Format d'image non supporté.");
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new ImageError(
      "Stockage d'images non configuré (BLOB_READ_WRITE_TOKEN manquant).",
    );
  }

  const input = Buffer.from(await file.arrayBuffer());
  const quality = opts.quality ?? 85;

  let output: Buffer;
  try {
    const pipeline = sharp(input).rotate();
    if (opts.mode === 'cover') {
      pipeline.resize(opts.width, opts.height, { fit: 'cover' });
    } else {
      pipeline.resize(opts.width, opts.height, { fit: 'inside', withoutEnlargement: true });
    }
    output = await pipeline.jpeg({ quality }).toBuffer();
  } catch {
    throw new ImageError("Erreur lors du traitement de l'image.");
  }

  const name = `uploads/${Math.floor(Date.now() / 1000)}_${crypto.randomBytes(8).toString('hex')}.jpg`;
  try {
    const blob = await put(name, output, {
      access: 'private',
      contentType: 'image/jpeg',
    });
    return { imagePath: blob.downloadUrl };
  } catch (err) {
    console.error('Blob upload error:', err);
    throw new ImageError("Impossible d'enregistrer l'image.");
  }
}

/** Deletes a previously uploaded Blob image. No-op for non-blob paths. */
export async function deleteUpload(imagePath: string | null | undefined): Promise<void> {
  if (!imagePath) return;
  // Only attempt to delete Vercel Blob URLs.
  if (!/^https?:\/\//i.test(imagePath)) return;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(imagePath);
  } catch (err) {
    console.error('Blob delete error:', err);
  }
}
