import { Provider } from '@/components/ui/provider';
import '@/styles/globals.css';
import renderPageTitle from '@/utils/render';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import i18n from '@/localization/i18n';
import { I18nextProvider } from 'react-i18next';
import { getBrowserLanguage } from '@/utils/language';
import { Toaster } from '@/components/ui/toaster';

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
      <Provider>
        <I18nextProvider i18n={i18n}>
          <Component {...pageProps} />
          <Toaster />
        </I18nextProvider>
      </Provider>
    </>
  );
}
