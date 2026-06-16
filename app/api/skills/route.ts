import { NextResponse } from 'next/server';
import { getSkills } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const skills = await getSkills();
  return NextResponse.json({ skills });
}
