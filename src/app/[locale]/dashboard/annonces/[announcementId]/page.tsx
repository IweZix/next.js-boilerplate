'use client';

import { Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import AnnouncementForm from '@/components/core/announcements/announcement-form';
import GoBackButton from '@/components/core/go-back-button';
import { tKeys } from '@/localization/tKeys';
import { getAnnouncement } from '@/services/announcements';

export default function AnnouncementDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { announcementId } = useParams<{ announcementId: string }>();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['announcement', announcementId],
    queryFn: () => getAnnouncement(announcementId),
  });

  const isFeatureDisabled =
    error instanceof Error && error.message === 'feature_disabled';

  useEffect(() => {
    if (isFeatureDisabled) {
      router.replace(`/${locale}/dashboard/upgrade?feature=banner`);
    }
  }, [isFeatureDisabled, locale, router]);

  if (isPending || isFeatureDisabled) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof Error && error.message === 'not_found') {
      notFound();
    }
    if (error instanceof Error && error.message === 'forbidden') {
      return <Text>{t(tKeys.announcements.accessDenied)}</Text>;
    }
    return <Text>{t(tKeys.announcements.detail.loadError)}</Text>;
  }

  const { announcement } = data;

  return (
    <Stack gap={6}>
      <GoBackButton href={`/${locale}/dashboard/annonces`} />
      <Heading size="lg">{t(tKeys.announcements.form.editTitle)}</Heading>
      <AnnouncementForm mode="edit" announcement={announcement} />
    </Stack>
  );
}
