import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import GoBackButton from '@/components/core/go-back-button';
import type { AdminUser } from '@/lib/supabase/list-users';
import { ForbiddenError, getUserForAdmin } from '@/lib/supabase/list-users';
import { tKeys } from '@/localization/tKeys';
import { Role } from '@/types/Role';

const ROLE_ORDER = [Role.ADMIN, Role.MANAGER, Role.USER];

function getInitials(user: AdminUser): string {
  if (user.firstName || user.lastName) {
    return (
      `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() ||
      '?'
    );
  }
  return user.email?.[0]?.toUpperCase() ?? '?';
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="wider"
      textTransform="uppercase"
      color="fg.muted"
      pb={3}
      mb={3}
      borderBottomWidth="1px"
    >
      {children}
    </Text>
  );
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <Stack gap={1}>
      <Text fontSize="sm" color="fg.muted">
        {label}
      </Text>
      <Box
        bg="gray.50"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        px={3}
        py={2}
      >
        <Text>{value}</Text>
      </Box>
    </Stack>
  );
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
    const user = await getUserForAdmin(userId);

    if (!user) {
      notFound();
    }

    const displayName = user.fullName ?? user.email ?? '';
    const notProvided = t(tKeys.users.detail.notProvided);
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

    return (
      <Stack gap={6}>
        <GoBackButton href={`/${locale}/dashboard/users`} />

        <Stack gap={1}>
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="wider"
            textTransform="uppercase"
            color="fg.muted"
          >
            {t(tKeys.users.detail.header, { email: user.email ?? '' })}
          </Text>
          <Heading size="2xl">{displayName}</Heading>
        </Stack>

        <Flex
          gap={6}
          direction={{ base: 'column', lg: 'row' }}
          align="flex-start"
        >
          <Stack gap={6} flex="2" w="full">
            <Box borderWidth="1px" borderColor="gray.200" rounded="lg" p={5}>
              <SectionLabel>{t(tKeys.users.detail.identityTitle)}</SectionLabel>
              <Stack gap={4}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                  <ReadOnlyField
                    label={t(tKeys.users.detail.firstNameLabel)}
                    value={user.firstName ?? notProvided}
                  />
                  <ReadOnlyField
                    label={t(tKeys.users.detail.lastNameLabel)}
                    value={user.lastName ?? notProvided}
                  />
                </SimpleGrid>
                <ReadOnlyField
                  label={t(tKeys.users.detail.emailLabel)}
                  value={user.email ?? notProvided}
                />
              </Stack>
            </Box>

            <Box borderWidth="1px" borderColor="gray.200" rounded="lg" p={5}>
              <SectionLabel>{t(tKeys.users.detail.roleTitle)}</SectionLabel>
              <Stack gap={3}>
                {ROLE_ORDER.map((role) => {
                  const isCurrent = user.role === role;

                  return (
                    <Flex
                      key={role}
                      align="flex-start"
                      gap={3}
                      p={4}
                      borderWidth="1px"
                      borderColor={isCurrent ? 'red.500' : 'gray.200'}
                      bg={isCurrent ? 'red.50' : undefined}
                      rounded="md"
                    >
                      <Box
                        mt="6px"
                        w="8px"
                        h="8px"
                        rounded="full"
                        bg={isCurrent ? 'red.500' : 'gray.300'}
                        flexShrink={0}
                      />
                      <Stack gap={0}>
                        <Text fontWeight="bold">
                          {t(tKeys.users.detail.roles[role].label)}
                        </Text>
                        <Text fontSize="sm" color="fg.muted">
                          {t(tKeys.users.detail.roles[role].description)}
                        </Text>
                      </Stack>
                    </Flex>
                  );
                })}
              </Stack>
            </Box>
          </Stack>

          <Box
            flex="1"
            w="full"
            borderWidth="1px"
            borderColor="gray.200"
            rounded="lg"
            p={5}
          >
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
        </Flex>
      </Stack>
    );
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return <Text>{t(tKeys.users.accessDenied)}</Text>;
    }
    throw error;
  }
}
