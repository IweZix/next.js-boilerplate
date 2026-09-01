import { NextResponse } from 'next/server';
import { ForbiddenError, listUsersForAdmin } from '@/lib/supabase/list-users';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const perPage = Math.max(1, Number(searchParams.get('perPage')) || 10);

  try {
    const result = await listUsersForAdmin(page, perPage);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'users_unavailable' }, { status: 503 });
  }
}
