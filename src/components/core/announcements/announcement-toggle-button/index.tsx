'use client';

import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toggleAnnouncement } from '@/app/[locale]/dashboard/annonces/actions';
import { toaster } from '@/components/ui/toaster';
import { tKeys } from '@/localization/tKeys';

interface AnnouncementToggleButtonProps {
  id: string;
  isActive: boolean;
}

export default function AnnouncementToggleButton({
  id,
  isActive,
}: AnnouncementToggleButtonProps) {
  const t = useTranslations();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => toggleAnnouncement(id, !isActive),
    onSuccess: (result) => {
      if (!result.ok) {
        toaster.create({
          title: t(tKeys.announcements.toggleError),
          type: 'error',
        });
        return;
      }
      router.refresh();
    },
    onError: () => {
      toaster.create({
        title: t(tKeys.announcements.toggleError),
        type: 'error',
      });
    },
  });

  return (
    <Button
      onClick={() => mutation.mutate()}
      loading={mutation.isPending}
      variant="outline"
      size="sm"
    >
      {isActive
        ? t(tKeys.announcements.toggleOff)
        : t(tKeys.announcements.toggleOn)}
    </Button>
  );
}
