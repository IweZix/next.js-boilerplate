import { Stack } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import PageHeader from '@/components/core/page-header';
import { getPreferences } from '@/lib/preferences';
import { tKeys } from '@/localization/tKeys';
import PreferencesForm from './preferences-form';

export default async function Settings() {
  const t = await getTranslations();
  const preferences = await getPreferences();

  return (
    <Stack gap={4}>
      <PageHeader title={t(tKeys.settings.title)} />

      <PreferencesForm
        initialLocale={preferences.locale}
        initialTheme={preferences.theme}
      />
    </Stack>
  );
}
