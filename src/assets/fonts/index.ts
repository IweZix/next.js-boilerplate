import { Space_Grotesk, Alumni_Sans } from 'next/font/google';

export interface Font {
  fontWeight?: string;
  fontSize?: number;
  lineHeight?: number;
  className?: string;
  fontStyle?: string;
}

export const AlumniSans = Alumni_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const SpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export interface Fonts {
  alumniSans: {
    '10px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
    '20px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
  };
  spaceGrotesk: {
    '10px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
    '20px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
    '30px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
    '40px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
    '50px': {
      normal: Font;
      light: Font;
      semiBold: Font;
      bold: Font;
    };
  };
}

const FONTS: Fonts = {
  alumniSans: {
    '10px': {
      normal: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      light: {
        fontWeight: '200',
        fontSize: 10,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
    },
    '20px': {
      normal: {
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      light: {
        fontWeight: '200',
        fontSize: 20,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 1.5,
        className: AlumniSans.className,
      },
    },
  },
  spaceGrotesk: {
    '10px': {
      normal: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      light: {
        fontWeight: '300',
        fontSize: 10,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 10,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
    },
    '20px': {
      normal: {
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      light: {
        fontWeight: '300',
        fontSize: 20,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
    },
    '30px': {
      normal: {
        fontWeight: '400',
        fontSize: 30,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      light: {
        fontWeight: '300',
        fontSize: 30,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 30,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
    },
    '40px': {
      normal: {
        fontWeight: '400',
        fontSize: 40,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      light: {
        fontWeight: '300',
        fontSize: 40,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 40,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 40,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
    },
    '50px': {
      normal: {
        fontWeight: '400',
        fontSize: 50,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      light: {
        fontWeight: '300',
        fontSize: 50,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      semiBold: {
        fontWeight: '600',
        fontSize: 50,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
      bold: {
        fontWeight: '700',
        fontSize: 50,
        lineHeight: 1.5,
        className: SpaceGrotesk.className,
      },
    },
  },
};

export default FONTS;
