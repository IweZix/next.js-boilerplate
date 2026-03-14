'use client';
import { useTranslations } from 'next-intl';
import { tKeys } from '@/localization/tKeys';
import { Button } from '@/components/ui/button';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        {t(tKeys.homepage.title)}
      </h1>
      <h1 className="text-3xl font-bold underline">
        {t(tKeys.homepage.title)}
      </h1>
      <h1 className="text-3xl font-bold underline">
        {t(tKeys.homepage.title)}
      </h1>
      <Button variant="outline">Button</Button>
    </div>
  );
}
