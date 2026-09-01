import { Heading, Stack, Text } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/supabase/current-user';
import { getUserMetadata } from '@/lib/supabase/user-metadata';
import { tKeys } from '@/localization/tKeys';

export default async function Dashboard() {
  const t = await getTranslations();
  const user = await getCurrentUser();
  const userMetadata = getUserMetadata(user);

  return (
    <Stack gap={4}>
      <Heading size="lg">{t(tKeys.dashboard.title)}</Heading>
      <Text>
        {t(tKeys.dashboard.welcome, {
          email: `${userMetadata.firstName} ${userMetadata.lastName}`,
        })}
      </Text>
    </Stack>
  );
}
