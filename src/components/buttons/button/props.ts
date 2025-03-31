export interface ButtonProps {
  text: string;
  onClick?: () => void;
  fontColor?: string;
  bgColor?: string;
  fontColorHover?: string;
  bgColorHover?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
