'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { tKeys } from '@/localization/tKeys';
import { logout } from '@/services/auth';

export default function LogoutButton() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    router.push(`/${locale}/login`);
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} loading={isLoading} variant="outline">
      {t(tKeys.dashboard.logout)}
    </Button>
  );
}
