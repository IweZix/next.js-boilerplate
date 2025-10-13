import COLORS from '@/assets/colors';
import { Font } from '@/assets/fonts';
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

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
  font?: Font;
  buttonVariant?: ButtonVariant;
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  DANGER = 'danger',
  OUTLINED = 'outlined',
  SUCCESS = 'success',
}

type ButtonVariantStyles = {
  [ButtonVariant.PRIMARY]: ChakraButtonProps;
  [ButtonVariant.DANGER]: ChakraButtonProps;
  [ButtonVariant.SUCCESS]: ChakraButtonProps;
  [ButtonVariant.OUTLINED]: ChakraButtonProps;
};

export const ButtonStyle: ButtonVariantStyles = {
  [ButtonVariant.PRIMARY]: {
    backgroundColor: COLORS.default.blue[500],
    color: COLORS.default.white,
    border: `none`,
    _hover: {
      backgroundColor: COLORS.default.blue[600],
      color: COLORS.default.white,
    },
    _loading: {
      backgroundColor: COLORS.default.blue[100],
      color: COLORS.default.white,
      cursor: 'wait',
    },
  },
  [ButtonVariant.DANGER]: {
    backgroundColor: COLORS.default.red[500],
    color: COLORS.default.white,
    border: `none`,
    _hover: {
      backgroundColor: COLORS.default.red[600],
      color: COLORS.default.white,
    },
    _loading: {
      backgroundColor: COLORS.default.red[100],
      color: COLORS.default.white,
      cursor: 'wait',
    },
  },
  [ButtonVariant.SUCCESS]: {
    backgroundColor: COLORS.default.green[500],
    color: COLORS.default.white,
    border: 'none',
    _hover: {
      backgroundColor: COLORS.default.green[600],
      color: COLORS.default.white,
    },
    _loading: {
      backgroundColor: COLORS.default.green[200],
      color: COLORS.default.green[600],
      cursor: 'wait',
    },
  },
  [ButtonVariant.OUTLINED]: {
    backgroundColor: COLORS.default.white,
    color: COLORS.default.blue[500],
    border: `1px solid ${COLORS.default.blue[500]}`,
    _hover: {
      backgroundColor: COLORS.default.blue[100],
      color: COLORS.default.blue[500],
      borderColor: COLORS.default.blue[500],
    },
    _loading: {
      backgroundColor: COLORS.default.white,
      color: COLORS.default.blue[100],
      cursor: 'wait',
    },
  },
};
