import { NextResponse } from 'next/server';
import { listServices } from '@/lib/content/services';

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const services = listServices();
  return NextResponse.json({ services });
}



