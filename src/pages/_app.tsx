import { Provider } from '@/components/ui/provider';
import '@/styles/globals.css';
import renderPageTitle from '@/utils/render';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    renderPageTitle('Next.js - Boilerplate');
  });

  return (
    <>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
