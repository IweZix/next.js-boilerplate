import { Button as ChakraButton } from '@chakra-ui/react';
import { ButtonProps, ButtonStyle, ButtonVariant } from './props';

const Button = ({
  text,
  buttonVariant = ButtonVariant.PRIMARY,
  fontColor,
  bgColor,
  fontColorHover,
  bgColorHover,
  isLoading = false,
  isDisabled = false,
  onClick,
  leftIcon,
  rightIcon,
  font,
}: ButtonProps) => {
  const buttonStyles = ButtonStyle[buttonVariant];
  return (
    <ChakraButton
      color={fontColor ? fontColor : buttonStyles.color}
      backgroundColor={bgColor ? bgColor : buttonStyles.backgroundColor}
      border={buttonStyles.border}
      _hover={{
        backgroundColor: bgColorHover ? bgColorHover : buttonStyles._hover?.backgroundColor,
        color: fontColorHover ? fontColorHover : buttonStyles._hover?.color,
      }}
      loading={isLoading}
      disabled={isDisabled}
      variant={'solid'}
      onClick={onClick}
      {...font}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {text}
      {rightIcon && <span>{rightIcon}</span>}
    </ChakraButton>
  );
};

export default Button;
