import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { system } from './systeme';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system || defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
