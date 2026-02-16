import { Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Toaster } from 'sileo';

/**
 * SileoToaster is a wrapper component for the Toaster from the Sileo library.
 * @returns {ReactNode} - The Toaster component with custom styling and positioning.
 * @description This component is used to display toast notifications in the application. It is positioned at the top center of the screen and has custom styles for the fill color and description text.
 * @usage
 * const onPress = () => {
 *   sileo.success({
 *     title: 'Success!',
 *     description: 'The operation was completed successfully.',
 *   });
 * }
 */
export const SileoToaster = (): ReactNode => {
  return (
    <Stack zIndex={11}>
      <Toaster
        position="top-center"
        options={{
          fill: '#171717',
          styles: { description: 'text-white/75!' },
          duration: 3000,
        }}
      />
    </Stack>
  );
};
