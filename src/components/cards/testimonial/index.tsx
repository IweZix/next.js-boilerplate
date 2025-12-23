import { HStack, Stack, VStack, RatingGroup } from '@chakra-ui/react';
import { BaseTestimonialCardProps } from './props';
import CustomText from '@/components/core/texts/text';
import COLORS from '@/assets/colors';

const BaseTestimonialCard = ({ data }: BaseTestimonialCardProps) => {
  return (
    <VStack
      w="100%"
      maxW="600px"
      height="100%"
      borderColor={COLORS.default.black}
      borderWidth={1}
      borderRadius="md"
      padding={8}
      gap={6}
    >
      <HStack width="100%">
        <RatingGroup.Root readOnly count={5} defaultValue={data.valuation} size="sm">
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      </HStack>
      <HStack width="100%">
        <CustomText text={data.testimonial} fontColor={COLORS.default.black} />
      </HStack>
      <HStack width="100%">
        <Stack width={12} borderRadius={'full'} overflow="hidden">
          {data.avatar}
        </Stack>
        <VStack alignItems="flex-start">
          <CustomText text={data.name} fontColor={COLORS.default.black} />
          <CustomText text={data.role} fontColor={COLORS.default.gray[500]} />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default BaseTestimonialCard;
