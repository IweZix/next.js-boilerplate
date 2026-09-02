# Supabase — adding a new route

This project uses Supabase (Auth for now) **server-side only**. The browser never talks to Supabase directly: everything goes through Next.js route handlers under `src/app/api/`. This document explains what to do when adding a new route that uses Supabase.

## Architecture rule

- No Supabase client in a `'use client'` component, no `fetch` from the browser to `*.supabase.co`.
- All Supabase logic lives in a route under `src/app/api/**/route.ts`, called from the front end via a function in `src/services/*.ts` (see `src/services/auth.ts`).
- The server-side Supabase client is obtained via `createClient()` in [`src/lib/supabase/server.ts`](../src/lib/supabase/server.ts) — it reads/writes the session cookies via `next/headers` and forces `httpOnly` on those cookies (see `src/lib/supabase/secure-cookie-options.ts`). Don't instantiate `createServerClient`/`createClient` (`@supabase/supabase-js`) any other way in a route.

## Creating a new route

1. Create `src/app/api/<name>/route.ts` and export the HTTP method you need (`GET`, `POST`, ...).
2. Get the client with `const supabase = await createClient()`.
3. Wrap the Supabase call in a `try/catch` and return a generic error message (never Supabase's raw error) — see `src/app/api/auth/login/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  // ... validate the body ...

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('my_table').select();

    if (error) {
      return NextResponse.json({ error: 'request_failed' }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'auth_unavailable' }, { status: 503 });
  }
}
```

## Protecting a route (requires a logged-in user)

The middleware (`src/proxy.ts`) only protects **pages** (`/dashboard`, `/login`) — routes under `/api` are explicitly excluded from its matcher. An API route that needs a logged-in user must check for one itself:

```ts
const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}
```

## Keys and secrets

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the only keys to use in an app route (already wired into `createClient()`). The `NEXT_PUBLIC_` prefix isn't an issue here since these keys are never used client-side in this project.
- `SUPABASE_SERVICE_ROLE_KEY`: **forbidden in any app route**. It bypasses RLS policies and auth rules. Reserved for one-off admin scripts, run locally by hand, never committed.

## Hard rule: no public self-signup

No route should ever call `supabase.auth.signUp` — that's the client-facing signup flow, and this app has none: nobody creates their own account. There's no public, unauthenticated way to create a user.

Account creation *is* allowed, but only admin-gated, through `POST /api/admin/users` → `createUserForAdmin()` in `src/lib/supabase/list-users.ts`, which calls `supabase.auth.admin.createUser` behind the exact same `assertCurrentUserIsAdmin()` check as every other `admin/*` route (see `listUsersForAdmin`, `getUserForAdmin`, `updateUserForAdmin` in the same file for the pattern). Don't call `admin.createUser` from anywhere else, and never from a route that isn't behind that check.

## Calling the route from the front end

Add a function in `src/services/*.ts` (or a new service file) that does a relative `fetch` to the route — **not** `customInstance` (`src/utils/custom-instance.ts`), which targets the external Strapi backend (`NEXT_PUBLIC_BACKEND_URL`), not our own `/api`. See `src/services/auth.ts` for the pattern:

```ts
export async function myFunction(payload: Payload): Promise<Result> {
  const response = await fetch('/api/my-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('request_failed');
  }

  return response.json();
}
```

## Verify

- `npm run lint:check`
- `npx tsc --noEmit`
- `npm run build`
- Manual test: `curl -X POST http://localhost:3000/api/my-endpoint -H 'Content-Type: application/json' -d '{...}'`, or directly in the browser for a route called by a page.
