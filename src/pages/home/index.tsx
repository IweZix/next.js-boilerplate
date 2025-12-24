import React from 'react';
import { VStack } from '@chakra-ui/react';
import Hero8 from '@/components/core/heros/hero-8';

const HomePage = () => {
  return (
    <VStack>
      <Hero8
        title="This is my title"
        description="This is a semi-long description to explain the website"
        buttonText="BOOK A CONSULTATION"
        action={() => {
          console.log('Button clicked');
        }}
      />
    </VStack>
  );
};

export default HomePage;
