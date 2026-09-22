'use client';

import { Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import AuditActionBadge from '@/components/core/journal/audit-action-badge';
import AuditDiff from '@/components/core/journal/audit-diff';
import { formatDisplayDateTime } from '@/lib/announcements/dates';
import { tKeys } from '@/localization/tKeys';
import { getAuditLogs } from '@/services/audit-logs';

const HISTORY_PER_PAGE = 50;

interface AuditHistoryProps {
  tableName: string;
  recordId: string;
}

export default function AuditHistory({
  tableName,
  recordId,
}: AuditHistoryProps) {
  const t = useTranslations();
  const locale = useLocale();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['journal', tableName, recordId],
    queryFn: () =>
      getAuditLogs({ tableName, recordId, page: 1, perPage: HISTORY_PER_PAGE }),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof Error && error.message === 'forbidden') {
      return <Text>{t(tKeys.journal.accessDenied)}</Text>;
    }
    return <Text>{t(tKeys.journal.history.loadError)}</Text>;
  }

  if (data.items.length === 0) {
    return <Text color="fg.muted">{t(tKeys.journal.history.empty)}</Text>;
  }

  return (
    <Stack gap={0}>
      {data.items.map((log, index) => (
        <Flex key={log.id} gap={4}>
          <Stack align="center" gap={0}>
            <Box
              w="10px"
              h="10px"
              rounded="full"
              bg="fg.muted"
              mt="6px"
              flexShrink={0}
            />
            {index < data.items.length - 1 && (
              <Box w="2px" flex="1" bg="border" minH="24px" />
            )}
          </Stack>
          <Stack gap={2} pb={6} flex="1">
            <Stack direction="row" gap={2} align="center" wrap="wrap">
              <AuditActionBadge action={log.action} />
              <Text fontSize="sm" color="fg.muted">
                {formatDisplayDateTime(log.createdAt, locale)}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {log.userEmail ?? t(tKeys.journal.system)}
              </Text>
            </Stack>
            <AuditDiff log={log} />
          </Stack>
        </Flex>
      ))}
    </Stack>
  );
}
