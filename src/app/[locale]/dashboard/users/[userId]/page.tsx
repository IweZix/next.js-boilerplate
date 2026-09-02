import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import GoBackButton from '@/components/core/go-back-button';
import UserEditForm from '@/components/core/users/user-edit-form';
import { getCurrentUser } from '@/lib/supabase/current-user';
import type { AdminUser } from '@/lib/supabase/list-users';
import { ForbiddenError, getUserForAdmin } from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';

function getInitials(user: AdminUser): string {
  if (user.firstName || user.lastName) {
    return (
      `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() ||
      '?'
    );
  }
  return user.email?.[0]?.toUpperCase() ?? '?';
}

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
    const createdAt = user.createdAt
      ? t(tKeys.users.detail.createdAt, {
          date: new Date(user.createdAt).toLocaleDateString(locale),
        })
      : undefined;
    const lastSignIn = user.lastSignInAt
      ? t(tKeys.users.detail.lastSignIn, {
          date: new Date(user.lastSignInAt).toLocaleDateString(locale),
        })
      : t(tKeys.users.detail.neverSignedIn);

    const profileCard = (
      <Box w="full" borderWidth="1px" borderColor="gray.200" rounded="lg" p={5}>
        <Flex align="center" gap={3} mb={4}>
          <Flex
            w="48px"
            h="48px"
            rounded="md"
            bg="red.500"
            color="white"
            align="center"
            justify="center"
            fontWeight="bold"
            flexShrink={0}
          >
            {getInitials(user)}
          </Flex>
          <Stack gap={0}>
            <Text fontWeight="bold">{displayName}</Text>
            {user.role && (
              <Text fontSize="sm" color="fg.muted">
                {t(tKeys.users.detail.roles[user.role].label)}
              </Text>
            )}
          </Stack>
        </Flex>

        <Stack
          gap={2}
          pt={4}
          borderTopWidth="1px"
          fontSize="sm"
          color="fg.muted"
        >
          {createdAt && <Text>{createdAt}</Text>}
          <Text>{lastSignIn}</Text>
          <Flex align="center" gap={2}>
            <Box
              w="8px"
              h="8px"
              rounded="full"
              bg={user.isActive ? 'green.500' : 'gray.400'}
            />
            <Text>
              {user.isActive
                ? t(tKeys.users.detail.active)
                : t(tKeys.users.detail.inactive)}
            </Text>
          </Flex>
        </Stack>
      </Box>
    );

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
          profileCard={profileCard}
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
