import { randomBytes } from 'node:crypto';
import type { User } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { getUserRole } from '@/lib/supabase/role';
import { createClient } from '@/lib/supabase/server';
import { getUserMetadata } from '@/lib/supabase/user-metadata';
import { Role } from '@/types/Role';

export class ForbiddenError extends Error {}
export class CannotChangeOwnRoleError extends Error {}
export class CannotDeactivateOwnAccountError extends Error {}
export class CannotDeleteOwnAccountError extends Error {}

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

export async function assertCurrentUserIsAdmin(): Promise<void> {
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

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  role: Role;
}

export async function updateUserForAdmin(
  userId: string,
  input: UpdateUserInput,
): Promise<AdminUser> {
  await assertCurrentUserIsAdmin();

  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId && getUserRole(currentUser) !== input.role) {
    throw new CannotChangeOwnRoleError();
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { firstName: input.firstName, lastName: input.lastName },
    app_metadata: { role: input.role },
  });

  if (error) {
    throw error;
  }

  return toAdminUser(data.user);
}

export interface CreateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}

export interface CreateUserResult {
  user: AdminUser;
  temporaryPassword: string;
}

export async function createUserForAdmin(
  input: CreateUserInput,
): Promise<CreateUserResult> {
  await assertCurrentUserIsAdmin();

  const temporaryPassword = randomBytes(15).toString('base64url');

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: { firstName: input.firstName, lastName: input.lastName },
    app_metadata: { role: input.role },
  });

  if (error) {
    throw error;
  }

  return { user: toAdminUser(data.user), temporaryPassword };
}

export async function sendPasswordResetEmail(
  email: string,
  redirectTo: string,
): Promise<void> {
  await assertCurrentUserIsAdmin();

  // Public Supabase Auth operation — the regular anon-key client is enough,
  // no need for the admin/service_role client here.
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    throw error;
  }
}

export async function setUserActiveForAdmin(
  userId: string,
  isActive: boolean,
): Promise<AdminUser> {
  await assertCurrentUserIsAdmin();

  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId && !isActive) {
    throw new CannotDeactivateOwnAccountError();
  }

  const supabase = createAdminClient();
  // No native "permanent ban" — a long duration is the practical equivalent.
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: isActive ? 'none' : '876000h',
  });

  if (error) {
    throw error;
  }

  return toAdminUser(data.user);
}

export async function deleteUserForAdmin(userId: string): Promise<void> {
  await assertCurrentUserIsAdmin();

  const currentUser = await getCurrentUser();
  if (currentUser?.id === userId) {
    throw new CannotDeleteOwnAccountError();
  }

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw error;
  }
}
