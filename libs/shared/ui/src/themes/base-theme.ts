import * as tokens from '@shopify/polaris-tokens';
import { createTheme } from '@shopify/restyle';

const pxToNumber = (px: string) => {
  return parseInt(px.replace('px', ''), 10);
};

// https://www.figma.com/file/QwZvryiWjvuE0nnBWBDUXn/Polaris-for-Admin%3A-Colors-(Community)?node-id=2989%3A136
const base = {
  colors: {
    surface: tokens.colorWhite,
    text: tokens.colorBlack,
    success: tokens.colorGreen,
    warning: tokens.colorYellow,
    critical: tokens.colorRed,
    primary: tokens.colorGreen,
    icon: tokens.colorBlack,
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
  screenVariants: {
    defaults: {
      flex: 1,
      backgroundColor: 'surface',
    },
  },
  buttonVariants: {
    defaults: {
      backgroundColor: 'primary',
    },
  },
  iconButtonVariants: {
    defaults: {
      color: 'icon',
    },
  },
  fabVariants: {
    defaults: {
      color: 'surface',
      backgroundColor: 'primary',
    },
  },
  textVariants: {
    defaults: {
      fontSize: 18,
      color: 'text',
    },
  },
};

export const baseTheme = createTheme({
  ...base,
});

export type Theme = typeof baseTheme;
