import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { LuArrowLeft } from 'react-icons/lu';
import { tKeys } from '@/localization/tKeys';

interface GoBackButtonProps {
  href: string;
}

export default async function GoBackButton({ href }: GoBackButtonProps) {
  const t = await getTranslations();

  return (
    <Link href={href}>
      <Flex align="center" gap={2} color="fg.muted" _hover={{ color: 'fg' }}>
        <LuArrowLeft />
        <Text>{t(tKeys.common.back)}</Text>
      </Flex>
    </Link>
  );
}
