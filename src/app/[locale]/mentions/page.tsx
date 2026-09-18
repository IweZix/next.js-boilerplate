import { Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

interface MentionsProps {
  params: Promise<{ locale: string }>;
}

export default async function Mentions({ params }: MentionsProps) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <Stack
      gap={6}
      px={{ base: 4, md: 8, lg: 16 }}
      py={{ base: 6, md: 12, lg: 16 }}
    >
      <Heading as="h1" size="xl">
        {t(tKeys.mentions.title)}
      </Heading>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.editor.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.editor.intro)}</Text>
        <Text>{t(tKeys.mentions.editor.identity)}</Text>
        <Text>{t(tKeys.mentions.editor.registeredOffice)}</Text>
        <Text>{t(tKeys.mentions.editor.bceNumber)}</Text>
        <Text>{t(tKeys.mentions.editor.vatNumber)}</Text>
        <Text>{t(tKeys.mentions.editor.court)}</Text>
        <Text>{t(tKeys.mentions.editor.email)}</Text>
        <Text>{t(tKeys.mentions.editor.phone)}</Text>
        <Text>{t(tKeys.mentions.editor.publisher)}</Text>
        <Text fontSize="sm">{t(tKeys.mentions.editor.soleTraderNote)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.hosting.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.hosting.intro)}</Text>
        <Text>{t(tKeys.mentions.hosting.details)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.intellectualProperty.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.intellectualProperty.paragraph1)}</Text>
        <Text>{t(tKeys.mentions.intellectualProperty.paragraph2)}</Text>
        <Text>{t(tKeys.mentions.intellectualProperty.paragraph3)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.content.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.content.paragraph1)}</Text>
        <Text>{t(tKeys.mentions.content.paragraph2)}</Text>
        <Text>{t(tKeys.mentions.content.paragraph3)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.thirdPartyLinks.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.thirdPartyLinks.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.personalData.heading)}
        </Heading>
        <Text>
          {t.rich(tKeys.mentions.personalData.intro, {
            link: (chunks) => (
              <Link href={`/${locale}/confidentialite`}>{chunks}</Link>
            ),
          })}
        </Text>
        <Text>{t(tKeys.mentions.personalData.controller)}</Text>
        <Text>{t(tKeys.mentions.personalData.contact)}</Text>
        <Text>{t(tKeys.mentions.personalData.authority)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.cookies.heading)}
        </Heading>
        <Text>
          {t.rich(tKeys.mentions.cookies.paragraph, {
            link: (chunks) => <Link href={`/${locale}/cookies`}>{chunks}</Link>,
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.governingLaw.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.governingLaw.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.contact.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.contact.paragraph)}</Text>
        <Text>{t(tKeys.mentions.contact.lastUpdated)}</Text>
      </Stack>
    </Stack>
  );
}
