import { Carousel, IconButton, Box, Stack } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { BaseCarouselProps } from './props';
import COLORS from '@/assets/colors';

const BaseSpacingCarousel = ({ items }: BaseCarouselProps) => {
  return (
    <Carousel.Root
      spacing="48px"
      slidesPerPage={2.5}
      slideCount={items.length}
      w="80%"
      mx="auto"
      data-variant="spacingIndicator"
    >
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Box w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {items[index].item}
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="space-between" gap="4">
        <Carousel.Indicators />

        <Stack direction="row">
          <Carousel.PrevTrigger asChild>
            <IconButton
              size="xs"
              variant="outline"
              borderRadius={'full'}
              borderColor={COLORS.default.gray[500]}
              _hover={{ bgColor: COLORS.default.gray[300] }}
            >
              <LuChevronLeft color={COLORS.default.black} />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.NextTrigger asChild>
            <IconButton
              size="xs"
              variant="outline"
              borderRadius={'full'}
              borderColor={COLORS.default.gray[500]}
              _hover={{ bgColor: COLORS.default.gray[300] }}
            >
              <LuChevronRight color={COLORS.default.black} />
            </IconButton>
          </Carousel.NextTrigger>
        </Stack>
      </Carousel.Control>
    </Carousel.Root>
  );
};

export default BaseSpacingCarousel;
