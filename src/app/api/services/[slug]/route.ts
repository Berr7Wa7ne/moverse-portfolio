import { NextResponse } from 'next/server';
import { getService } from '@/lib/content/services';

export const revalidate = 3600; // cache for 1 hour

type Params = { params: { slug: string } };

export async function GET(_req: Request, { params }: Params) {
  const service = getService(params.slug);
  if (!service) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ service });
}



