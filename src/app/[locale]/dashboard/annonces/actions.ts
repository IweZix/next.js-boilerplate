'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  endDateInputToUtc,
  startDateInputToUtc,
} from '@/lib/announcements/dates';
import {
  type Announcement,
  createAnnouncement as createAnnouncementRow,
  deleteAnnouncement as deleteAnnouncementRow,
  toggleAnnouncement as toggleAnnouncementRow,
  updateAnnouncement as updateAnnouncementRow,
} from '@/lib/announcements/repository';
import {
  type AnnouncementFormValues,
  announcementInputSchema,
} from '@/lib/announcements/schema';
import { isEnabled } from '@/lib/features';
import {
  assertCurrentUserIsAdmin,
  ForbiddenError,
} from '@/lib/supabase/list-users';

export type AnnouncementActionResult =
  | { ok: true; announcement: Announcement }
  | { ok: false; errors: Record<string, string[]> };

export type AnnouncementDeleteResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[]> };

async function guard(): Promise<AnnouncementDeleteResult> {
  try {
    await assertCurrentUserIsAdmin();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return { ok: false, errors: { _form: ['forbidden'] } };
    }
    throw error;
  }

  if (!(await isEnabled('banner'))) {
    return { ok: false, errors: { _form: ['feature_disabled'] } };
  }

  return { ok: true };
}

function toWriteInput(values: z.infer<typeof announcementInputSchema>) {
  return {
    message: values.message,
    linkUrl: values.linkUrl,
    linkLabel: values.linkLabel,
    variant: values.variant,
    startsAt: values.startsAt
      ? startDateInputToUtc(values.startsAt).toISOString()
      : null,
    endsAt: values.endsAt
      ? endDateInputToUtc(values.endsAt).toISOString()
      : null,
    isActive: values.isActive,
  };
}

function parseOrErrors(values: AnnouncementFormValues) {
  const parsed = announcementInputSchema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = z.flattenError(parsed.error);
    return {
      ok: false as const,
      errors: {
        ...fieldErrors,
        ...(formErrors.length ? { _form: formErrors } : {}),
      },
    };
  }
  return { ok: true as const, data: parsed.data };
}

export async function createAnnouncement(
  values: AnnouncementFormValues,
): Promise<AnnouncementActionResult> {
  const guardResult = await guard();
  if (!guardResult.ok) return guardResult;

  const parsed = parseOrErrors(values);
  if (!parsed.ok) return parsed;

  try {
    const announcement = await createAnnouncementRow(toWriteInput(parsed.data));
    revalidatePath('/', 'layout');
    return { ok: true, announcement };
  } catch {
    return { ok: false, errors: { _form: ['unexpected_error'] } };
  }
}

export async function updateAnnouncement(
  id: string,
  values: AnnouncementFormValues,
): Promise<AnnouncementActionResult> {
  const guardResult = await guard();
  if (!guardResult.ok) return guardResult;

  const parsed = parseOrErrors(values);
  if (!parsed.ok) return parsed;

  try {
    const announcement = await updateAnnouncementRow(
      id,
      toWriteInput(parsed.data),
    );
    revalidatePath('/', 'layout');
    return { ok: true, announcement };
  } catch {
    return { ok: false, errors: { _form: ['unexpected_error'] } };
  }
}

export async function toggleAnnouncement(
  id: string,
  isActive: boolean,
): Promise<AnnouncementActionResult> {
  const guardResult = await guard();
  if (!guardResult.ok) return guardResult;

  try {
    const announcement = await toggleAnnouncementRow(id, isActive);
    revalidatePath('/', 'layout');
    return { ok: true, announcement };
  } catch {
    return { ok: false, errors: { _form: ['unexpected_error'] } };
  }
}

export async function deleteAnnouncement(
  id: string,
): Promise<AnnouncementDeleteResult> {
  const guardResult = await guard();
  if (!guardResult.ok) return guardResult;

  try {
    await deleteAnnouncementRow(id);
    revalidatePath('/', 'layout');
    return { ok: true };
  } catch {
    return { ok: false, errors: { _form: ['unexpected_error'] } };
  }
}
