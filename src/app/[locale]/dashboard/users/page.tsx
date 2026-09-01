import { Heading, Stack, Text } from '@chakra-ui/react';
import { getLocale, getTranslations } from 'next-intl/server';
import DataTable from '@/components/core/data-table';
import Pagination from '@/components/core/pagination';
import { ForbiddenError, listUsersForAdmin } from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';

const USERS_PER_PAGE = 10;

interface UsersProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Users({ searchParams }: UsersProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number(rawPage) || 1);

  try {
    const { users, lastPage } = await listUsersForAdmin(page, USERS_PER_PAGE);

    return (
      <Stack gap={4}>
        <Heading size="lg">{t(tKeys.users.title)}</Heading>
        <DataTable
          headers={[
            t(tKeys.users.columns.email),
            t(tKeys.users.columns.name),
            t(tKeys.users.columns.role),
          ]}
          rows={users.map((user) => ({
            id: user.id,
            cells: [user.email, user.fullName ?? 'N/A', user.role ?? 'N/A'],
          }))}
        />
        <Pagination
          page={page}
          lastPage={lastPage}
          hrefForPage={(targetPage) =>
            `/${locale}/dashboard/users?page=${targetPage}`
          }
        />
      </Stack>
    );
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return <Text>{t(tKeys.users.accessDenied)}</Text>;
    }
    throw error;
  }
}
