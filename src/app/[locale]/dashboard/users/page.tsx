'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import DataTable from '@/components/core/data-table';
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

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof Error && error.message === 'forbidden') {
      return <Text>{t(tKeys.users.accessDenied)}</Text>;
    }
    return <Text>{t(tKeys.users.loadError)}</Text>;
  }

  return (
    <Stack gap={4}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">{t(tKeys.users.title)}</Heading>
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
      </Flex>
      <DataTable
        headers={[
          t(tKeys.users.columns.email),
          t(tKeys.users.columns.name),
          t(tKeys.users.columns.role),
          t(tKeys.users.columns.status),
        ]}
        rows={data.users.map((user) => ({
          id: user.id,
          href: `/${locale}/dashboard/users/${user.id}`,
          cells: [
            user.email,
            user.fullName ?? 'N/A',
            user.role ?? 'N/A',
            <Flex key="status" align="center" gap={2}>
              <Box
                w="8px"
                h="8px"
                rounded="full"
                bg={user.isActive ? 'green.500' : 'gray.400'}
              />
              <Text>
                {user.isActive
                  ? t(tKeys.users.columns.active)
                  : t(tKeys.users.columns.inactive)}
              </Text>
            </Flex>,
          ],
        }))}
      />
      <Pagination
        page={page}
        lastPage={data.lastPage}
        hrefForPage={(targetPage) =>
          `/${locale}/dashboard/users?page=${targetPage}`
        }
      />
    </Stack>
  );
}
