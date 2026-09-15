import { Heading, Stack, Text } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import { tKeys } from '@/localization/tKeys';

export default async function Mentions() {
  const t = await getTranslations();

  return (
    <Stack gap={6} px={{ base: 4, md: 8, lg: 16 }} py={{ base: 6, md: 12, lg: 16 }}>
      <Heading as="h1" size="xl">
        {t(tKeys.mentions.title)}
      </Heading>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.editor.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.editor.intro, {
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.identity, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
            legalForm: process.env.NEXT_PUBLIC_COMPANY_LEGAL_FORM ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.registeredOffice, {
            street: process.env.NEXT_PUBLIC_COMPANY_STREET ?? '',
            postalCode: process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE ?? '',
            city: process.env.NEXT_PUBLIC_COMPANY_CITY ?? '',
            country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.bceNumber, {
            bceNumber: process.env.NEXT_PUBLIC_COMPANY_BCE_NUMBER ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.vatNumber, {
            vatNumber: process.env.NEXT_PUBLIC_COMPANY_VAT_NUMBER ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.court, {
            district: process.env.NEXT_PUBLIC_COMPANY_DISTRICT ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.email, {
            email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.phone, {
            phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.editor.publisher, {
            publisherName: process.env.NEXT_PUBLIC_PUBLISHER_NAME ?? '',
            publisherRole: process.env.NEXT_PUBLIC_PUBLISHER_ROLE ?? '',
          })}
        </Text>
        <Text fontSize="sm">
          {t(tKeys.mentions.editor.soleTraderNote, {
            publisherName: process.env.NEXT_PUBLIC_PUBLISHER_NAME ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.hosting.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.hosting.intro)}</Text>
        <Text>
          {t(tKeys.mentions.hosting.details, {
            hostingName: process.env.NEXT_PUBLIC_HOSTING_NAME ?? '',
            hostingAddress: process.env.NEXT_PUBLIC_HOSTING_ADDRESS ?? '',
            hostingWebsite: process.env.NEXT_PUBLIC_HOSTING_WEBSITE ?? '',
            hostingContact: process.env.NEXT_PUBLIC_HOSTING_CONTACT ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.intellectualProperty.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.intellectualProperty.paragraph1, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.intellectualProperty.paragraph2, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.intellectualProperty.paragraph3, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.content.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.content.paragraph1, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.content.paragraph2, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.content.paragraph3, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.thirdPartyLinks.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.thirdPartyLinks.paragraph, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.personalData.heading)}
        </Heading>
        <Text>{t(tKeys.mentions.personalData.intro)}</Text>
        <Text>
          {t(tKeys.mentions.personalData.controller, {
            companyName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? '',
            address: process.env.NEXT_PUBLIC_COMPANY_FULL_ADDRESS ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.personalData.contact, {
            dpoEmail: process.env.NEXT_PUBLIC_DPO_EMAIL ?? '',
          })}
        </Text>
        <Text>{t(tKeys.mentions.personalData.authority)}</Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.cookies.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.cookies.paragraph, {
            consentWithdrawalMethod:
              process.env.NEXT_PUBLIC_CONSENT_WITHDRAWAL_METHOD ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.governingLaw.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.governingLaw.paragraph, {
            governingLawCountry:
              process.env.NEXT_PUBLIC_GOVERNING_LAW_COUNTRY ?? '',
            judicialDistrict: process.env.NEXT_PUBLIC_JUDICIAL_DISTRICT ?? '',
          })}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Heading as="h2" size="md">
          {t(tKeys.mentions.contact.heading)}
        </Heading>
        <Text>
          {t(tKeys.mentions.contact.paragraph, {
            email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
          })}
        </Text>
        <Text>
          {t(tKeys.mentions.contact.lastUpdated, {
            date: process.env.NEXT_PUBLIC_MENTIONS_LAST_UPDATED ?? '',
          })}
        </Text>
      </Stack>
    </Stack>
  );
}
