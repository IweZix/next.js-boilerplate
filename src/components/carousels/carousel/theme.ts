// theme/recipes/carousel.ts
import { carouselAnatomy } from '@chakra-ui/react/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';
import COLORS from '@/assets/colors';

export const carouselSlotRecipe = defineSlotRecipe({
  slots: carouselAnatomy.keys(),
  base: {
    indicator: {
      bg: 'transparent',
      _current: {
        bg: COLORS.default.gray[700],
        w: '32px',
      },
      _hover: {
        bg: COLORS.default.gray[500],
      },
      outline: `1px solid ${COLORS.default.gray[500]}`,
      outlineOffset: '2px',
    },
  },
});
