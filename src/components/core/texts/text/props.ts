import { Font } from '@/assets/fonts';

export interface TextProps {
  text: string;
  onClick?: () => void;
  fontColor?: string;
  bgColor?: string;
  fontColorHover?: string;
  bgColorHover?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  font?: Font;
}
