import { Heading, Stack, Text } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { tKeys } from '@/localization/tKeys';

export default async function Dashboard() {
  const t = await getTranslations();
  const user = await getCurrentUser();

  return (
    <Stack gap={4}>
      <Heading size="lg">{t(tKeys.dashboard.title)}</Heading>
      <Text>{t(tKeys.dashboard.welcome, { email: user?.email ?? '' })}</Text>
    </Stack>
  );
}
