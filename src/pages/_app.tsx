import { Provider } from '@/components/core/ui/provider';
import '@/styles/globals.css';
import renderPageTitle from '@/utils/render';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import i18n from '@/localization/i18n';
import { I18nextProvider } from 'react-i18next';
import { getBrowserLanguage } from '@/utils/language';
import { Toaster } from '@/components/core/ui/toaster';
import { Header } from '@/layouts/header';
import SeoHead from '@/components/core/seo-head';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Render page title
    renderPageTitle('Next.js - Boilerplate');

    // Set the language based on browser settings
    const browserLanguage = getBrowserLanguage();
    try {
      i18n.changeLanguage(browserLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, []);

  return (
    <>
      <SeoHead
        title="Next.js - Boilerplate"
        description="A Next.js boilerplate with all the best practices."
        url="https://tonsite.be"
        image="/preview.png"
      />
      <Provider>
        <I18nextProvider i18n={i18n}>
          <Header />
          <Component {...pageProps} />
          <Toaster />
        </I18nextProvider>
      </Provider>
    </>
  );
}
