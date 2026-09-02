import { Heading, Stack, Text } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import GoBackButton from '@/components/core/go-back-button';
import ProfileCard from '@/components/core/users/profile-card';
import UserEditForm from '@/components/core/users/user-edit-form';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { ForbiddenError, getUserForAdmin } from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';

export default async function UserDetail({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { userId } = await params;

  try {
    const [user, currentUser] = await Promise.all([
      getUserForAdmin(userId),
      getCurrentUser(),
    ]);

    if (!user) {
      notFound();
    }

    const displayName = user.fullName ?? user.email ?? '';

    return (
      <Stack gap={6}>
        <GoBackButton href={`/${locale}/dashboard/users`} />

        <Stack gap={1}>
          <Heading size="2xl">{displayName}</Heading>
        </Stack>

        <UserEditForm
          userId={user.id}
          email={user.email}
          initialFirstName={user.firstName}
          initialLastName={user.lastName}
          initialRole={user.role}
          isOwnAccount={currentUser?.id === user.id}
          isActive={user.isActive}
          profileCard={<ProfileCard user={user} />}
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
