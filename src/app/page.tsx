'use client';
import { useTranslation } from 'react-i18next';
import { tKeys } from '@/localization/tKeys';

export default function Home() {
  const { t } = useTranslation();

  return (
    <h1 className="text-3xl font-bold underline">{t(tKeys.homepage.title)}</h1>
  );
}
