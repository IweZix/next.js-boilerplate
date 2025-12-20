import React from 'react';
import { VStack } from '@chakra-ui/react';
import CustomText from '@/components/core/texts/text';
import COLORS from '@/assets/colors';

const AboutPage = () => {
  return (
    <VStack paddingTop="100px">
      <CustomText text="This is the about page" fontColor={COLORS.default.black} />
    </VStack>
  );
};

export default AboutPage;
