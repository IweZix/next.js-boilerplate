import Head from 'next/head';
import { JSX } from 'react';
import { SeoHeadProps } from './props.ts';

export default function SeoHead({
  title,
  description,
  url = 'https://tonsite.be',
  image = '/preview.png',
}: SeoHeadProps): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Luca Nicolas Web" />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_BE" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={url} />
    </Head>
  );
}
