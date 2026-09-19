import { Badge, Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import AnnouncementDeleteButton from '@/components/core/announcements/announcement-delete-button';
import AnnouncementToggleButton from '@/components/core/announcements/announcement-toggle-button';
import DataTable, { type DataTableRow } from '@/components/core/data-table';
import PageHeader from '@/components/core/page-header';
import {
  formatDisplayDate,
  getAnnouncementPeriod,
} from '@/lib/announcements/dates';
import {
  getActiveAnnouncementRow,
  listAnnouncements,
} from '@/lib/announcements/repository';
import {
  type AnnouncementStatus,
  getAnnouncementStatus,
} from '@/lib/announcements/status';
import { isEnabled } from '@/lib/features';
import {
  assertCurrentUserIsAdmin,
  ForbiddenError,
} from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';
import { truncateLabel } from '@/utils/format';

const STATUS_COLOR_PALETTE: Record<AnnouncementStatus, string> = {
  live: 'green',
  scheduled: 'blue',
  expired: 'gray',
  disabled: 'gray',
  pending: 'orange',
};

export default async function AnnouncementsPage() {
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

  const [announcements, activeAnnouncement] = await Promise.all([
    listAnnouncements(),
    getActiveAnnouncementRow(),
  ]);
  const activeId = activeAnnouncement?.id ?? null;
  const now = new Date();

  function periodText(startsAt: string | null, endsAt: string | null): string {
    const period = getAnnouncementPeriod(startsAt, endsAt);
    if (period.kind === 'from') {
      return t(tKeys.announcements.period.from, {
        date: formatDisplayDate(period.date, locale),
      });
    }
    if (period.kind === 'until') {
      return t(tKeys.announcements.period.until, {
        date: formatDisplayDate(period.date, locale),
      });
    }
    if (period.kind === 'range') {
      return t(tKeys.announcements.period.range, {
        start: formatDisplayDate(period.start, locale),
        end: formatDisplayDate(period.end, locale),
      });
    }
    return t(tKeys.announcements.period.unlimited);
  }

  const rows: DataTableRow[] = announcements.map((announcement) => {
    const status = getAnnouncementStatus(announcement, activeId, now);
    return {
      id: announcement.id,
      cells: [
        <Link
          key="message"
          href={`/${locale}/dashboard/annonces/${announcement.id}`}
        >
          {truncateLabel(announcement.message, 60)}
        </Link>,
        periodText(announcement.startsAt, announcement.endsAt),
        <Badge key="status" colorPalette={STATUS_COLOR_PALETTE[status]}>
          {t(tKeys.announcements.status[status])}
        </Badge>,
        <Stack key="actions" direction="row" gap={2}>
          <AnnouncementToggleButton
            id={announcement.id}
            isActive={announcement.isActive}
          />
          <AnnouncementDeleteButton id={announcement.id} />
        </Stack>,
      ],
    };
  });

  return (
    <Stack gap={4}>
      <PageHeader
        title={t(tKeys.announcements.title)}
        action={
          <Button
            asChild
            colorPalette="gray"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            <Link href={`/${locale}/dashboard/annonces/new`}>
              {t(tKeys.announcements.addButton)}
            </Link>
          </Button>
        }
      />
      {announcements.length === 0 ? (
        <Stack align="center" gap={4} py={12}>
          <Text color="fg.muted">
            {t(tKeys.announcements.emptyDescription)}
          </Text>
          <Button
            asChild
            colorPalette="gray"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            <Link href={`/${locale}/dashboard/annonces/new`}>
              {t(tKeys.announcements.addButton)}
            </Link>
          </Button>
        </Stack>
      ) : (
        <DataTable
          headers={[
            t(tKeys.announcements.columns.message),
            t(tKeys.announcements.columns.period),
            t(tKeys.announcements.columns.status),
            t(tKeys.announcements.columns.actions),
          ]}
          rows={rows}
        />
      )}
    </Stack>
  );
}
