import type { Role } from '@/types/Role';

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  role: Role;
}

export interface CreateUserPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}

export interface CreateUserResult {
  user: { id: string };
  temporaryPassword: string;
}

export async function createUser(
  payload: CreateUserPayload,
): Promise<CreateUserResult> {
  const response = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'create_failed');
  }

  return response.json();
}

export async function updateUser(
  userId: string,
  payload: UpdateUserPayload,
): Promise<void> {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'update_failed');
  }
}

export async function sendPasswordReset(
  userId: string,
  email: string,
  locale: string,
): Promise<void> {
  const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, locale }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'reset_failed');
  }
}

export async function setUserActive(
  userId: string,
  isActive: boolean,
): Promise<void> {
  const response = await fetch(`/api/admin/users/${userId}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'status_update_failed');
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'delete_failed');
  }
}
