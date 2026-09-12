'use client';

import {
  Button,
  Card,
  Flex,
  Heading,
  NativeSelect,
  Stack,
  Text,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { tKeys } from '@/localization/tKeys';
import { Locale } from '@/types/Locale';

export default function Settings() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleSave = () => {
    const segments = pathname.split('/');
    segments[1] = selectedLocale;
    router.push(segments.join('/'));
  };

  return (
    <Stack gap={4}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">{t(tKeys.settings.title)}</Heading>
        <Button
          onClick={handleSave}
          disabled={selectedLocale === locale}
          colorPalette="gray"
          bg="black"
          color="white"
          _hover={{ bg: 'gray.800' }}
        >
          {t(tKeys.settings.save)}
        </Button>
      </Flex>

      <Card.Root>
        <Card.Body>
          <Stack gap={2}>
            <Text fontWeight="semibold">
              {t(tKeys.settings.language.label)}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {t(tKeys.settings.language.description)}
            </Text>
            <NativeSelect.Root maxW="240px">
              <NativeSelect.Field
                value={selectedLocale}
                onChange={(event) => setSelectedLocale(event.target.value)}
              >
                <option value={Locale.FR}>
                  {t(tKeys.settings.language.options.fr)}
                </option>
                <option value={Locale.EN}>
                  {t(tKeys.settings.language.options.en)}
                </option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
