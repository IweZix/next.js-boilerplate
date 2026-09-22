'use client';

import { Heading, Spinner, Stack, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import GoBackButton from '@/components/core/go-back-button';
import AuditHistory from '@/components/core/journal/audit-history';
import ProfileCard from '@/components/core/users/profile-card';
import UserEditForm from '@/components/core/users/user-edit-form';
import { tKeys } from '@/localization/tKeys';
import { getUser } from '@/services/users';

export default function UserDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { userId } = useParams<{ userId: string }>();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof Error && error.message === 'not_found') {
      notFound();
    }
    if (error instanceof Error && error.message === 'forbidden') {
      return <Text>{t(tKeys.users.accessDenied)}</Text>;
    }
    return <Text>{t(tKeys.users.detail.loadError)}</Text>;
  }

  const { user, isOwnAccount } = data;
  const displayName = user.fullName ?? user.email ?? '';

  return (
    <Stack gap={6}>
      <GoBackButton href={`/${locale}/dashboard/users`} />

      <Stack gap={1}>
        <Heading size="2xl">{displayName}</Heading>
      </Stack>

      <Tabs.Root defaultValue="edit">
        <Tabs.List>
          <Tabs.Trigger value="edit">
            {t(tKeys.users.detail.tabs.edit)}
          </Tabs.Trigger>
          <Tabs.Trigger value="history">
            {t(tKeys.users.detail.tabs.history)}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="edit">
          <UserEditForm
            userId={user.id}
            email={user.email}
            initialFirstName={user.firstName}
            initialLastName={user.lastName}
            initialRole={user.role}
            isOwnAccount={isOwnAccount}
            isActive={user.isActive}
            profileCard={<ProfileCard user={user} />}
          />
        </Tabs.Content>
        <Tabs.Content value="history">
          <AuditHistory tableName="users" recordId={user.id} />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
