'use client';
import { useTranslations } from 'next-intl';
import { tKeys } from '@/localization/tKeys';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <h1 className="text-1xl font-bold underline">
        {t(tKeys.homepage.title)}
      </h1>
      <h1 className="text-2xl font-bold">
        {t(tKeys.homepage.title)}
      </h1>
      <h1 className="text-3xl font-bold underline">
        {t(tKeys.homepage.title)}
      </h1>
    </div>
  );
}
