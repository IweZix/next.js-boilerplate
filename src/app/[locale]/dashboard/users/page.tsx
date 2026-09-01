import { Heading } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

export default async function Users() {
  const t = await getTranslations();

  return <Heading size="lg">{t(tKeys.sidebar.nav.users)}</Heading>;
}
