export type Color = string;
export interface Colors {
  website: {
    background: Color;
    principal: Color;
  };
  default: {
    white: Color;
    black: Color;
    gray: {
      100: Color;
      200: Color;
      300: Color;
      400: Color;
      500: Color;
      600: Color;
      700: Color;
      800: Color;
    };
    blue: {
      100: Color;
      200: Color;
      300: Color;
      400: Color;
      500: Color;
      600: Color;
      700: Color;
      800: Color;
      900: Color;
    };
    green: {
      100: Color;
      200: Color;
      300: Color;
      400: Color;
      500: Color;
      600: Color;
      700: Color;
      800: Color;
      900: Color;
    };
    red: {
      100: Color;
      200: Color;
      300: Color;
      400: Color;
      500: Color;
      600: Color;
      700: Color;
      800: Color;
      900: Color;
    };
  };
}

const COLORS: Colors = {
  website: {
    background: '#18181B',
    principal: '#1B263B',
  },
  default: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F7FAFC',
      200: '#EDF2F7',
      300: '#E2E8F0',
      400: '#CBD5E0',
      500: '#A0AEC0',
      600: '#718096',
      700: '#4A5568',
      800: '#2D3748',
    },
    blue: {
      100: '#EBF8FF',
      200: '#BEE3F8',
      300: '#90CDF4',
      400: '#63B3ED',
      500: '#4299E1',
      600: '#3182CE',
      700: '#2B6CB0',
      800: '#2C5282',
      900: '#2B6CB0',
    },
    green: {
      100: '#F0FFF4',
      200: '#C6F6D5',
      300: '#9AE6B4',
      400: '#68D391',
      500: '#48BB78',
      600: '#38A169',
      700: '#2F855A',
      800: '#276749',
      900: '#22543D',
    },
    red: {
      100: '#FFF5F5',
      200: '#FED7D7',
      300: '#FEB2B2',
      400: '#FC8181',
      500: '#F56565',
      600: '#E53E3E',
      700: '#C53030',
      800: '#9B2C2C',
      900: '#742A2A',
    },
  },
};

export default COLORS;
