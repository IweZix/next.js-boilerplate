// middleware.ts

import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { routing } from '@/localization/routing';

const handleIntl = createMiddleware(routing);

const localePattern = new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`);

const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PATHS = ['/login'];

export default async function middleware(request: NextRequest) {
  const intlResponse = handleIntl(request);

  // Locale correction/redirect: let it happen first, auth is re-checked on the next pass.
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  const match = request.nextUrl.pathname.match(localePattern);
  const locale = match?.[1] ?? routing.defaultLocale;
  const pathnameWithoutLocale = match?.[2] || '/';

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  );
  const isAuthPath = AUTH_PATHS.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  );

  // Public routes never touch Supabase, so they keep working even if it's
  // unreachable or misconfigured.
  if (!isProtectedPath && !isAuthPath) {
    return intlResponse;
  }

  let user = null;
  try {
    const { response: supabaseResponse, user: sessionUser } =
      await updateSession(request);
    user = sessionUser;
    for (const cookie of supabaseResponse.cookies.getAll()) {
      intlResponse.cookies.set(cookie);
    }
  } catch {
    // Supabase unreachable/misconfigured: fail closed (treat as logged out)
    // instead of crashing the whole request.
  }

  if (isProtectedPath && !user) {
    return redirectTo(request, intlResponse, `/${locale}/login`);
  }

  if (isAuthPath && user) {
    return redirectTo(request, intlResponse, `/${locale}/dashboard`);
  }

  return intlResponse;
}

function redirectTo(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname;
  const redirectResponse = NextResponse.redirect(redirectUrl);
  for (const cookie of response.cookies.getAll()) {
    redirectResponse.cookies.set(cookie);
  }
  return redirectResponse;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
