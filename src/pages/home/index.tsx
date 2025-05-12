import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { t } from 'i18next';
import { tKeys } from '@/localization/tKeys';

const HomePage = () => {
  return (
    <VStack>
      <Text>{t(tKeys.homepage.title)}</Text>
    </VStack>
  );
};

export default HomePage;
