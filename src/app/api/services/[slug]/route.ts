import { NextRequest, NextResponse } from 'next/server';
import { getService } from '@/lib/content/services';

export const revalidate = 3600; // cache for 1 hour

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const service = getService(slug);

  if (!service) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ service });
}
