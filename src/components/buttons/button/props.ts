import COLORS from '@/assets/colors';
import { Font } from '@/assets/fonts';

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
}

export const ButtonStyle = {
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
  [ButtonVariant.OUTLINED]: {
    backgroundColor: COLORS.default.white, // Fond transparent
    color: COLORS.default.blue[500], // Couleur du texte : bleu principal
    border: `1px solid ${COLORS.default.blue[500]}`, // Bordure bleue
    _hover: {
      backgroundColor: COLORS.default.blue[100], // Fond bleu clair au survol
      color: COLORS.default.blue[500], // Couleur du texte au survol
      borderColor: COLORS.default.blue[500], // Bordure inchangée au survol
    },
    _loading: {
      backgroundColor: COLORS.default.white, // Fond toujours blanc pendant le chargement
      color: COLORS.default.blue[100], // Texte bleu clair pendant le chargement
      cursor: 'wait', // Curseur de chargement
    },
  },
};
