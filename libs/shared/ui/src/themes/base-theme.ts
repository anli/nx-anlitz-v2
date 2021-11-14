import * as tokens from '@shopify/polaris-tokens';
import { createTheme } from '@shopify/restyle';

const pxToNumber = (px: string) => {
  return parseInt(px.replace('px', ''), 10);
};

const base = {
  colors: {
    surface: tokens.colorWhite,
    text: tokens.colorBlack,
    success: tokens.colorGreen,
    warning: tokens.colorYellow,
    critical: tokens.colorRed,
  },
  spacing: {
    none: 0,
    extraTight: pxToNumber(tokens.spacingExtraTight),
    tight: pxToNumber(tokens.spacingTight),
    baseTight: pxToNumber(tokens.spacingBaseTight),
    base: pxToNumber(tokens.spacingBase),
    loose: pxToNumber(tokens.spacingLoose),
    extraLoose: pxToNumber(tokens.spacingExtraLoose),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const baseTheme = createTheme({
  ...base,
});

export type Theme = typeof baseTheme;
