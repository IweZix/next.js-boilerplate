import { Heading, Stack, Table, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

interface CookiesProps {
  params: Promise<{ locale: string }>;
}

export default async function Cookies({ params }: CookiesProps) {
  const { locale } = await params;
  const t = await getTranslations();

  const necessaryRows = Object.values(tKeys.cookies.tables.necessary.rows);
  const analyticsRows = Object.values(tKeys.cookies.tables.analytics.rows);

  return (
    <Stack
      gap={6}
      px={{ base: 4, md: 8, lg: 16 }}
      py={{ base: 6, md: 12, lg: 16 }}
    >
      <Heading as="h1" size="xl">
        {t(tKeys.cookies.title)}
      </Heading>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.whatIsACookie.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.whatIsACookie.paragraph1)}</Text>
        <Text>{t(tKeys.cookies.whatIsACookie.paragraph2)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.whoSets.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.whoSets.intro)}</Text>
        <Text>{t(tKeys.cookies.whoSets.firstParty)}</Text>
        <Text>{t(tKeys.cookies.whoSets.thirdParty)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.consent.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.consent.necessary)}</Text>
        <Text>{t(tKeys.cookies.consent.optional)}</Text>
        <Text>{t(tKeys.cookies.consent.noChoiceYet)}</Text>
        <Text>{t(tKeys.cookies.consent.withdraw)}</Text>
        <Text>{t(tKeys.cookies.consent.duration)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.tables.heading)}
        </Heading>

        <Heading as="h3" size="sm">
          {t(tKeys.cookies.tables.necessary.heading)}
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.necessary.headers.name)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.necessary.headers.setBy)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.necessary.headers.purpose)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.necessary.headers.duration)}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {necessaryRows.map((row) => (
              <Table.Row key={row.name}>
                <Table.Cell>{t(row.name)}</Table.Cell>
                <Table.Cell>{t(row.setBy)}</Table.Cell>
                <Table.Cell>{t(row.purpose)}</Table.Cell>
                <Table.Cell>{t(row.duration)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Heading as="h3" size="sm">
          {t(tKeys.cookies.tables.analytics.heading)}
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.analytics.headers.name)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.analytics.headers.setBy)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.analytics.headers.purpose)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.analytics.headers.duration)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.cookies.tables.analytics.headers.thirdPartyPolicy)}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {analyticsRows.map((row) => (
              <Table.Row key={row.name}>
                <Table.Cell>{t(row.name)}</Table.Cell>
                <Table.Cell>{t(row.setBy)}</Table.Cell>
                <Table.Cell>{t(row.purpose)}</Table.Cell>
                <Table.Cell>{t(row.duration)}</Table.Cell>
                <Table.Cell>{t(row.thirdPartyPolicy)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.legalBasis.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.legalBasis.paragraph1)}</Text>
        <Text>
          {t.rich(tKeys.cookies.legalBasis.paragraph2, {
            link: (chunks) => (
              <Link href={`/${locale}/confidentialite`}>{chunks}</Link>
            ),
          })}
        </Text>
        <Text>{t(tKeys.cookies.legalBasis.transfersNote)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.browserSettings.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.browserSettings.intro)}</Text>
        <Text>{t(tKeys.cookies.browserSettings.chrome)}</Text>
        <Text>{t(tKeys.cookies.browserSettings.firefox)}</Text>
        <Text>{t(tKeys.cookies.browserSettings.safari)}</Text>
        <Text>{t(tKeys.cookies.browserSettings.edge)}</Text>
        <Text>{t(tKeys.cookies.browserSettings.deletionNote)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.complaint.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.complaint.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.cookies.changes.heading)}
        </Heading>
        <Text>{t(tKeys.cookies.changes.paragraph)}</Text>
        <Text>{t(tKeys.cookies.changes.lastUpdated)}</Text>
      </Stack>
    </Stack>
  );
}
