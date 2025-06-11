import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { darkColors, lightColors } from './colors';
import { fonts } from './fonts';

export const getTheme = (isDark = false) => {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const customColors = isDark ? darkColors : lightColors;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...customColors,
    },
    fonts: {
      regular: { fontFamily: fonts.regular, fontWeight: '400' },
      medium: { fontFamily: fonts.medium, fontWeight: '500' },
      semiBold: { fontFamily: fonts.semiBold, fontWeight: '600' },
      bold: { fontFamily: fonts.bold, fontWeight: '700' },
      titleLarge: { fontFamily: fonts.titleLarge, fontWeight: '600' },
      bodyMedium: { fontFamily: fonts.bodyMedium, fontWeight: '400' },
    },
  };
};
