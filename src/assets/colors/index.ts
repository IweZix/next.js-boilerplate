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
    background: '#ffffffff',
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
      100: '#CCCCFF', // clair
      200: '#9999FF', // plus clair
      300: '#6666FF',
      400: '#3333FF',
      500: '#0000FF', // point de départ
      600: '#0000E6',
      700: '#0000B3',
      800: '#000080',
      900: '#000066', // très foncé
    },
    green: {
      100: '#CCFFCC', // très clair
      200: '#99FF99', // clair
      300: '#66FF66',
      400: '#33FF33',
      500: '#00FF00', // point de départ
      600: '#00E600',
      700: '#00B300',
      800: '#008000',
      900: '#006600', // très foncé
    },
    red: {
      100: '#FFCCCC', // très clair
      200: '#FF9999', // clair
      300: '#FF6666',
      400: '#FF3333',
      500: '#FF0000', // point de départ
      600: '#E60000',
      700: '#B30000',
      800: '#800000',
      900: '#660000', // très foncé
    },
  },
};

export default COLORS;
