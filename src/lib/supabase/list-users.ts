import type { User } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { getUserRole } from '@/lib/supabase/role';
import { getUserMetadata } from '@/lib/supabase/user-metadata';
import { Role } from '@/types/Role';

export class ForbiddenError extends Error {}

export interface AdminUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: Role | null;
  createdAt?: string;
  lastSignInAt?: string;
  isActive: boolean;
}

export interface AdminUsersPage {
  users: AdminUser[];
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

function toAdminUser(user: User): AdminUser {
  const { firstName, lastName } = getUserMetadata(user);
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || undefined;
  const isActive =
    !user.banned_until || new Date(user.banned_until) <= new Date();

  return {
    id: user.id,
    email: user.email,
    firstName,
    lastName,
    fullName,
    role: getUserRole(user),
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at,
    isActive,
  };
}

async function assertCurrentUserIsAdmin(): Promise<void> {
  const currentUser = await getCurrentUser();
  const currentRole = getUserRole(currentUser);

  if (currentRole !== Role.ADMIN) {
    throw new ForbiddenError();
  }
}

/**
 * The role check happens here, inside the only functions that touch the
 * admin client — never in each caller — so reading user data is structurally
 * impossible without being verified as admin first, no matter who calls it.
 */
export async function listUsersForAdmin(
  page = 1,
  perPage = 10,
): Promise<AdminUsersPage> {
  await assertCurrentUserIsAdmin();

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    throw error;
  }

  return {
    users: data.users.map(toAdminUser),
    page,
    perPage,
    total: data.total,
    lastPage: data.lastPage,
  };
}

export async function getUserForAdmin(
  userId: string,
): Promise<AdminUser | null> {
  await assertCurrentUserIsAdmin();

  const supabase = createAdminClient();

  try {
    // Throws (rather than returning `error`) when `userId` isn't a valid
    // UUID — treated the same as "not found" either way.
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error || !data.user) {
      return null;
    }

    return toAdminUser(data.user);
  } catch {
    return null;
  }
}
