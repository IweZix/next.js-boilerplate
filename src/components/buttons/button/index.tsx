import COLORS from '@/assets/colors';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ButtonProps } from './props';

const Button = ({
  text,
  fontColor = COLORS.default.white,
  bgColor = COLORS.default.black,
  fontColorHover = COLORS.default.white,
  bgColorHover = COLORS.default.gray[800],
  isLoading = false,
  isDisabled = false,
  onClick,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  return (
    <ChakraButton
      color={fontColor}
      backgroundColor={bgColor}
      _hover={{
        backgroundColor: bgColorHover,
        color: fontColorHover,
      }}
      loading={isLoading}
      disabled={isDisabled}
      variant={'solid'}
      onClick={onClick}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {text}
      {rightIcon && <span>{rightIcon}</span>}
    </ChakraButton>
  );
};

export default Button;
