import { Text, VStack } from '@chakra-ui/react';
import { t } from 'i18next';
import { tKeys } from '@/localization/tKeys';

const homePage = () => {
  return (
    <VStack>
      <Text>{t(tKeys.homepage.title)}</Text>
    </VStack>
  );
};

export default homePage;
