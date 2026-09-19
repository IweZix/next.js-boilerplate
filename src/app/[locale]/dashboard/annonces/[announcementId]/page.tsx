import { Heading, Stack, Text } from '@chakra-ui/react';
import { notFound, redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import AnnouncementForm from '@/components/core/announcements/announcement-form';
import GoBackButton from '@/components/core/go-back-button';
import { getAnnouncementById } from '@/lib/announcements/repository';
import { isEnabled } from '@/lib/features';
import {
  assertCurrentUserIsAdmin,
  ForbiddenError,
} from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';

interface AnnouncementDetailPageProps {
  params: Promise<{ announcementId: string }>;
}

export default async function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const t = await getTranslations();
  const locale = await getLocale();

  try {
    await assertCurrentUserIsAdmin();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return <Text>{t(tKeys.announcements.accessDenied)}</Text>;
    }
    throw error;
  }

  if (!(await isEnabled('banner'))) {
    redirect(`/${locale}/dashboard/upgrade?feature=banner`);
  }

  const { announcementId } = await params;
  const announcement = await getAnnouncementById(announcementId);
  if (!announcement) notFound();

  return (
    <Stack gap={6}>
      <GoBackButton href={`/${locale}/dashboard/annonces`} />
      <Heading size="lg">{t(tKeys.announcements.form.editTitle)}</Heading>
      <AnnouncementForm mode="edit" announcement={announcement} />
    </Stack>
  );
}
