export interface Font {
  fontFamily: string;
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontSize: number;
  letterSpacing?: number;
  lineHeight?: number;
}

export const FONT_FAMILY = {
  AlumniSansRegular: 'AlumniSans-Regular',
  AlumniSansBold: 'AlumniSans-Bold',
  AlumniSansLight: 'AlumniSans-Light',
  AlumniSansSemiBold: 'AlumniSans-SemiBold',
  SpaceGroteskRegular: 'SpaceGrotesk-Regular',
  SpaceGroteskBold: 'SpaceGrotesk-Bold',
  SpaceGroteskLight: 'SpaceGrotesk-Light',
  SpaceGroteskSemiBold: 'SpaceGrotesk-SemiBold',
};

export interface Fonts {
  T1: {
    T10px: {
      Regular: Font;
      Bold: Font;
      SemiBold: Font;
      Light: Font;
    };
  };
}

const FONTS: Fonts = {
  T1: {
    T10px: {
      Regular: {
        fontFamily: FONT_FAMILY.SpaceGroteskRegular,
        fontSize: 10,
      },
      Bold: {
        fontFamily: FONT_FAMILY.SpaceGroteskBold,
        fontSize: 10,
      },
      SemiBold: {
        fontFamily: FONT_FAMILY.SpaceGroteskSemiBold,
        fontSize: 10,
      },
      Light: {
        fontFamily: FONT_FAMILY.SpaceGroteskLight,
        fontSize: 10,
      },
    },
  },
};

export default FONTS;
