import { createSystem, defaultConfig, mergeConfigs } from '@chakra-ui/react';
import { carouselSlotRecipe } from '../../carousels/carousel/theme';

const config = mergeConfigs(defaultConfig, {
  theme: {
    slotRecipes: {
      carousel: carouselSlotRecipe,
    },
  },
});

export const system = createSystem(config);
