import Button from '@/components/buttons/button';
import { Text, VStack } from '@chakra-ui/react';

const homePage = () => {
  return (
    <VStack>
      <Text>This is the home page</Text>
      <Button
        text="Click Me"
        fontColor="white"
        bgColor="blue.500"
        fontColorHover="black"
        bgColorHover="blue.300"
        isLoading={false}
        isDisabled={false}
        onClick={() => alert('Button Clicked!')}
        leftIcon={<span>🔍</span>}
        rightIcon={<span>➡️</span>}
      />
    </VStack>
  );
};

export default homePage;
