'use client';

import { Button, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import DataTable from '@/components/core/data-table';
import { mapUserToTableRow } from '@/components/core/mappers/user-table-mapper';
import PageHeader from '@/components/core/page-header';
import Pagination from '@/components/core/pagination';
import { tKeys } from '@/localization/tKeys';
import { getUsers } from '@/services/users';

const USERS_PER_PAGE = 10;

export default function Users() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['users', page, USERS_PER_PAGE],
    queryFn: () => getUsers(page, USERS_PER_PAGE),
  });

  const users = useMemo(
    () =>
      data?.users.map((user) => {
        return mapUserToTableRow(user, locale, t);
      }) ?? [],
    [data?.users, locale, t],
  );

  if (isError) {
    if (error instanceof Error && error.message === 'forbidden') {
      return <Text>{t(tKeys.users.accessDenied)}</Text>;
    }
    return <Text>{t(tKeys.users.loadError)}</Text>;
  }

  return (
    <Stack gap={4}>
      <PageHeader
        title={t(tKeys.users.title)}
        action={
          <Button
            asChild
            colorPalette="gray"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            <Link href={`/${locale}/dashboard/users/new`}>
              {t(tKeys.users.addButton)}
            </Link>
          </Button>
        }
      />
      <DataTable
        headers={[
          t(tKeys.users.columns.email),
          t(tKeys.users.columns.name),
          t(tKeys.users.columns.role),
          t(tKeys.users.columns.status),
        ]}
        rows={users}
        isLoading={isPending}
      />
      <Pagination
        page={page}
        lastPage={data?.lastPage ?? 1}
        hrefForPage={(targetPage) =>
          `/${locale}/dashboard/users?page=${targetPage}`
        }
      />
    </Stack>
  );
}
