import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB, same limit as the PHP app

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export interface ProcessOptions {
  /** Max width of the "resized" variant. */
  resizeWidth: number;
  /** Max height of the "resized" variant. */
  resizeHeight: number;
  /** Square thumbnail size in px. */
  thumbSize: number;
  /** JPEG/WebP quality (1-100). */
  quality?: number;
}

export interface ProcessResult {
  /** Web path (relative to /public) to use for display, e.g. "uploads/xxx_thumb.jpg". */
  imagePath: string;
}

export class ImageError extends Error {}

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

/**
 * Validates and processes an uploaded image, writing a resized variant and a
 * square thumbnail into /public/uploads. Returns the thumbnail web path
 * (matching the original PHP behaviour, which displayed the thumbnail).
 */
export async function processImageUpload(
  file: File,
  opts: ProcessOptions,
): Promise<ProcessResult> {
  if (file.size > MAX_SIZE) {
    throw new ImageError('Image trop volumineuse (max 2 Mo).');
  }
  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    throw new ImageError("Format d'image non supporté.");
  }

  await ensureDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  const nameBase = `${Math.floor(Date.now() / 1000)}_${crypto.randomBytes(8).toString('hex')}`;
  const resizedName = `${nameBase}_resized.${ext}`;
  const thumbName = `${nameBase}_thumb.jpg`;
  const resizedPath = path.join(UPLOAD_DIR, resizedName);
  const thumbPath = path.join(UPLOAD_DIR, thumbName);
  const quality = opts.quality ?? 85;

  try {
    // Resized variant — fit inside the bounds without enlarging.
    let pipeline = sharp(buffer).rotate().resize(opts.resizeWidth, opts.resizeHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
    if (ext === 'png') pipeline = pipeline.png({ quality });
    else if (ext === 'webp') pipeline = pipeline.webp({ quality });
    else if (ext === 'gif') pipeline = pipeline.gif();
    else pipeline = pipeline.jpeg({ quality });
    await pipeline.toFile(resizedPath);

    // Square thumbnail — always JPEG.
    await sharp(buffer)
      .rotate()
      .resize(opts.thumbSize, opts.thumbSize, { fit: 'cover' })
      .jpeg({ quality })
      .toFile(thumbPath);
  } catch (err) {
    // Clean up partial output
    await fs.rm(resizedPath, { force: true }).catch(() => {});
    await fs.rm(thumbPath, { force: true }).catch(() => {});
    throw new ImageError('Erreur lors du traitement de l\'image.');
  }

  return { imagePath: `uploads/${thumbName}` };
}

/** Deletes an uploaded image and its resized/thumbnail counterparts. */
export async function deleteUpload(imagePath: string | null | undefined): Promise<void> {
  if (!imagePath) return;
  const base = path.basename(imagePath);
  const candidates = new Set<string>([base]);

  // Derive counterpart names (resized <-> thumb)
  candidates.add(base.replace(/_resized\.[^.]+$/, '_thumb.jpg'));
  const m = base.match(/^(.*)_thumb\.jpg$/);
  if (m) {
    for (const ext of ['jpg', 'png', 'webp', 'gif']) {
      candidates.add(`${m[1]}_resized.${ext}`);
    }
  }

  await Promise.all(
    [...candidates].map((name) =>
      fs.rm(path.join(UPLOAD_DIR, name), { force: true }).catch(() => {}),
    ),
  );
}

/** Copies an uploaded file to the static home profile image path. */
export async function copyToProfileImage(webPath: string): Promise<void> {
  const source = path.join(process.cwd(), 'public', webPath.replace(/^\/+/, ''));
  const targetDir = path.join(process.cwd(), 'public', 'assets', 'images');
  await fs.mkdir(targetDir, { recursive: true });
  await fs.copyFile(source, path.join(targetDir, 'profile.jpg')).catch(() => {});
}
