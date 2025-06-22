import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

import { darkColors, lightColors } from './colors';
import { fonts } from './fonts';

const fontConfig = {
  displayLarge: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  titleLarge: {
    fontFamily: fonts.semiBold,
    fontWeight: '600' as const,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyLarge: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelSmall: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

export const getTheme = (isDark = false) => {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const customColors = isDark ? darkColors : lightColors;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...customColors,
    },
    fonts: configureFonts({ config: fontConfig }),
  };
};
