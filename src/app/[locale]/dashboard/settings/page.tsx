'use client';

import {
  Button,
  Card,
  createListCollection,
  Portal,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import PageHeader from '@/components/core/page-header';
import { tKeys } from '@/localization/tKeys';
import { Locale } from '@/types/Locale';

export default function Settings() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(
    locale as Locale,
  );

  const localeOptions = createListCollection({
    items: [
      { label: t(tKeys.settings.language.options.fr), value: Locale.FR },
      { label: t(tKeys.settings.language.options.en), value: Locale.EN },
    ],
  });

  const handleSave = () => {
    const segments = pathname.split('/');
    segments[1] = selectedLocale;
    router.push(segments.join('/'));
  };

  return (
    <Stack gap={4}>
      <PageHeader
        title={t(tKeys.settings.title)}
        action={
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
        }
      />

      <Card.Root>
        <Card.Body>
          <Stack gap={2}>
            <Text fontWeight="semibold">
              {t(tKeys.settings.language.label)}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {t(tKeys.settings.language.description)}
            </Text>
            <Select.Root
              collection={localeOptions}
              value={[selectedLocale]}
              onValueChange={(details) =>
                setSelectedLocale(details.value[0] as Locale)
              }
              maxW="240px"
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {localeOptions.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
