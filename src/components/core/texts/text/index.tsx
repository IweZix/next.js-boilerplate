import { Text as ChakraText } from '@chakra-ui/react';
import { TextProps } from './props';

const Text = ({
  text,
  onClick,
  fontColor,
  bgColor,
  fontColorHover,
  bgColorHover,
  leftIcon,
  rightIcon,
  font,
}: TextProps) => {
  return (
    <ChakraText
      onClick={onClick}
      color={fontColor}
      bgColor={bgColor}
      _hover={{
        color: fontColorHover,
        bgColor: bgColorHover,
      }}
      {...font}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {text}
      {rightIcon && <span>{rightIcon}</span>}
    </ChakraText>
  );
};

export default Text;
