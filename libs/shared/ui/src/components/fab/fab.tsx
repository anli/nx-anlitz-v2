import {
  backgroundColor,
  BackgroundColorProps,
  color,
  ColorProps,
  createRestyleComponent,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { FAB as FABNative } from 'react-native-paper';
import { Theme } from '../../themes';

const variant = createVariant({ themeKey: 'fabVariants' });
export type FABProps = ColorProps<Theme> &
  VariantProps<Theme, 'fabVariants'> &
  BackgroundColorProps<Theme> &
  React.ComponentProps<typeof FABNative>;

const restyleFunctions = [variant as any, color, backgroundColor];

const Component = createRestyleComponent<FABProps, Theme>([variant], FABNative);

export const FAB = ({ ...rest }: FABProps) => {
  const props = useRestyle(restyleFunctions, rest) as any;
  const buttonColor = props?.style?.find(() => true).color;

  return <Component color={buttonColor} {...props} />;
};
