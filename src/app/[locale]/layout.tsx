import './globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import EnvBanner from '@/components/core/banners/env-banner';
import { routing } from '@/localization/routing';
import type { Locale } from '@/types/Locale';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  // Passe les messages au client (pour les Client Components)
  const messages = await getMessages();

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
          <EnvBanner />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
