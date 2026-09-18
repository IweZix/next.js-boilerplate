import { Heading, Stack, Table, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

interface ConfidentialiteProps {
  params: Promise<{ locale: string }>;
}

export default async function Confidentialite({
  params,
}: ConfidentialiteProps) {
  const { locale } = await params;
  const t = await getTranslations();

  const legalBasisRows = Object.values(tKeys.privacy.legalBasis.rows);
  const processorRows = Object.values(tKeys.privacy.processors.rows);

  return (
    <Stack
      gap={6}
      px={{ base: 4, md: 8, lg: 16 }}
      py={{ base: 6, md: 12, lg: 16 }}
    >
      <Heading as="h1" size="xl">
        {t(tKeys.privacy.title)}
      </Heading>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.controller.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.editor.identity)}</Text>
        <Text>{t(tKeys.mentions.editor.registeredOffice)}</Text>
        <Text>{t(tKeys.mentions.editor.bceNumber)}</Text>
        <Text>{t(tKeys.privacy.controller.email)}</Text>
        <Text>{t(tKeys.privacy.controller.intro)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.scope.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.scope.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.dataCollected.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.dataCollected.directIntro)}</Text>
        <Text>{t(tKeys.privacy.dataCollected.contactForm)}</Text>
        <Text>{t(tKeys.privacy.dataCollected.autoIntro)}</Text>
        <Text>{t(tKeys.privacy.dataCollected.technicalLogs)}</Text>
        <Text>{t(tKeys.privacy.dataCollected.cookiesNote)}</Text>
        <Text>{t(tKeys.privacy.dataCollected.noSensitiveData)}</Text>
        <Text fontSize="sm">
          {t(tKeys.privacy.dataCollected.sensitiveDataNote)}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.legalBasis.heading)}
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                {t(tKeys.privacy.legalBasis.headers.purpose)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.privacy.legalBasis.headers.data)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.privacy.legalBasis.headers.basis)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.privacy.legalBasis.headers.retention)}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {legalBasisRows.map((row) => (
              <Table.Row key={row.purpose}>
                <Table.Cell>{t(row.purpose)}</Table.Cell>
                <Table.Cell>{t(row.data)}</Table.Cell>
                <Table.Cell>{t(row.basis)}</Table.Cell>
                <Table.Cell>{t(row.retention)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Text>{t(tKeys.privacy.legalBasis.consentNote)}</Text>
        <Text>{t(tKeys.privacy.legalBasis.legitimateInterestNote)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.processors.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.processors.intro)}</Text>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                {t(tKeys.privacy.processors.headers.provider)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.privacy.processors.headers.role)}
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {t(tKeys.privacy.processors.headers.location)}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {processorRows.map((row) => (
              <Table.Row key={row.provider}>
                <Table.Cell>{t(row.provider)}</Table.Cell>
                <Table.Cell>{t(row.role)}</Table.Cell>
                <Table.Cell>{t(row.location)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Text>{t(tKeys.privacy.processors.outro)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.transfers.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.transfers.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.retention.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.retention.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.security.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.security.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.rights.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.rights.intro)}</Text>
        <Text>{t(tKeys.privacy.rights.access)}</Text>
        <Text>{t(tKeys.privacy.rights.rectification)}</Text>
        <Text>{t(tKeys.privacy.rights.erasure)}</Text>
        <Text>{t(tKeys.privacy.rights.restriction)}</Text>
        <Text>{t(tKeys.privacy.rights.objection)}</Text>
        <Text>{t(tKeys.privacy.rights.portability)}</Text>
        <Text>{t(tKeys.privacy.rights.withdrawConsent)}</Text>
        <Text>{t(tKeys.privacy.rights.automatedDecision)}</Text>
        <Text>{t(tKeys.privacy.rights.exercise)}</Text>
        <Text>{t(tKeys.privacy.rights.complaintAuthority)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.cookies.heading)}
        </Heading>
        <Text>
          {t.rich(tKeys.privacy.cookies.paragraph, {
            link: (chunks) => <Link href={`/${locale}/cookies`}>{chunks}</Link>,
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.minors.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.minors.paragraph)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.privacy.changes.heading)}
        </Heading>
        <Text>{t(tKeys.privacy.changes.paragraph)}</Text>
        <Text>{t(tKeys.privacy.changes.lastUpdated)}</Text>
      </Stack>
    </Stack>
  );
}
