import { createAdminClient } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { getUserRole } from '@/lib/supabase/role';
import { getUserMetadata } from '@/lib/supabase/user-metadata';
import { Role } from '@/types/Role';

export class ForbiddenError extends Error {}

export interface AdminUser {
  id: string;
  email?: string;
  fullName?: string;
  role: Role | null;
}

export interface AdminUsersPage {
  users: AdminUser[];
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

/**
 * The role check happens here, inside the only function that touches the
 * admin client — never in each caller — so listing users is structurally
 * impossible without being verified as admin first, no matter who calls it.
 */
export async function listUsersForAdmin(
  page = 1,
  perPage = 10,
): Promise<AdminUsersPage> {
  const currentUser = await getCurrentUser();
  const currentRole = getUserRole(currentUser);

  if (currentRole !== Role.ADMIN) {
    throw new ForbiddenError();
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    throw error;
  }

  const users = data.users.map((user) => {
    const { firstName, lastName } = getUserMetadata(user);
    const fullName =
      [firstName, lastName].filter(Boolean).join(' ') || undefined;

    return {
      id: user.id,
      email: user.email,
      fullName,
      role: getUserRole(user),
    };
  });

  return { users, page, perPage, total: data.total, lastPage: data.lastPage };
}
