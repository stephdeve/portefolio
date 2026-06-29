import { type NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname');

  if (!pathname) {
    return NextResponse.json({ error: 'Missing pathname' }, { status: 400 });
  }

  try {
    const result = await get(pathname, { access: 'private' });

    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const headers: Record<string, string> = {
      'Content-Type': result.blob.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    };

    if (result.blob.contentType.startsWith('image/')) {
      headers['X-Content-Type-Options'] = 'nosniff';
    }

    return new NextResponse(result.stream, { headers });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blob' }, { status: 500 });
  }
}
