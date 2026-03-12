'use client';
import './globals.css';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import EnvBanner from '@/components/core/banners/env-banner';
import i18n from '@/localization/i18n';
import { getBrowserLanguage } from '@/utils/language';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const browserLanguage = getBrowserLanguage();
    try {
      i18n.changeLanguage(browserLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, []);
  
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <EnvBanner />
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}
