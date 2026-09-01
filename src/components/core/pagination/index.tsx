import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

interface PaginationProps {
  page: number;
  lastPage: number;
  hrefForPage: (page: number) => string;
}

export default async function Pagination({
  page,
  lastPage,
  hrefForPage,
}: PaginationProps) {
  const t = await getTranslations();

  return (
    <HStack justify="space-between">
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)}>
          <Text color="blue.500">{t(tKeys.pagination.previous)}</Text>
        </Link>
      ) : (
        <Text color="fg.muted">{t(tKeys.pagination.previous)}</Text>
      )}

      <Text fontSize="sm" color="fg.muted">
        {t(tKeys.pagination.pageOf, { page, lastPage })}
      </Text>

      {page < lastPage ? (
        <Link href={hrefForPage(page + 1)}>
          <Text color="blue.500">{t(tKeys.pagination.next)}</Text>
        </Link>
      ) : (
        <Text color="fg.muted">{t(tKeys.pagination.next)}</Text>
      )}
    </HStack>
  );
}
