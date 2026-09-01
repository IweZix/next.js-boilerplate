import { Heading, Stack, Text } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import LogoutButton from '@/components/core/auth/logout-button';
import { getUserRole } from '@/lib/supabase/role';
import { createClient } from '@/lib/supabase/server';
import { tKeys } from '@/localization/tKeys';

export default async function Dashboard() {
  const t = await getTranslations();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRole(user);

  return (
    <Stack maxW="sm" mx="auto" mt={16} gap={4}>
      <Heading size="lg">{t(tKeys.dashboard.title)}</Heading>
      <Text>{t(tKeys.dashboard.welcome, { email: user?.email ?? '' })}</Text>
      <Text>
        {role ? t(tKeys.dashboard.role, { role }) : t(tKeys.dashboard.noRole)}
      </Text>
      <LogoutButton />
    </Stack>
  );
}
