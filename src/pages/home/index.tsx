import Button from '@/components/buttons/button';
import { ButtonVariant } from '@/components/buttons/button/props';
import { Text, VStack } from '@chakra-ui/react';

const homePage = () => {
  return (
    <VStack>
      <Text>This is the home page</Text>
      <Button
        text="Click Me"
        isLoading={false}
        isDisabled={false}
        onClick={() => alert('Button Clicked!')}
        buttonVariant={ButtonVariant.OUTLINED}
      />
    </VStack>
  );
};

export default homePage;
