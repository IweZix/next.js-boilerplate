import { Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import CustomText from '../../texts/text';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import Button from '../../buttons/button';
import { Hero8Props } from './props';

const Hero8 = ({ title, description, buttonText, action }: Hero8Props) => {
  return (
    <Stack
      w="full"
      height={'900px'}
      backgroundImage="url('/templates/bg_1440_x_900.png')"
      backgroundSize="cover" // cover the entire area
      backgroundPosition="center" // center image
      backgroundRepeat="no-repeat" // avoid repeat
      justify="center"
      alignItems="center"
    >
      <VStack
        height="full"
        width={'90%'}
        justify="center"
        alignItems={{ base: 'center', sm: 'flex-start' }}
      >
        <VStack width={{ base: '100%', sm: '50%' }} gap={6}>
          <CustomText
            text={title}
            fontColor={COLORS.default.white}
            font={FONTS.spaceGrotesk['50px'].bold}
          />
          <VStack width={'100%'} alignItems={{ base: 'center', sm: 'flex-start' }}>
            <Stack width={'100%'}>
              <CustomText
                text={description}
                fontColor={COLORS.default.white}
                font={FONTS.spaceGrotesk['20px'].normal}
              />
            </Stack>
          </VStack>
          <VStack width={'100%'} alignItems="flex-start">
            <Button text={buttonText} onClick={action} />
          </VStack>
        </VStack>
      </VStack>
    </Stack>
  );
};

export default Hero8;
