import {
  border,
  BorderProps,
  color,
  ColorProps,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { Button as ButtonNative } from 'react-native-paper';
import { Theme, useDarkMode } from '../..';

const variant = createVariant({ themeKey: 'buttonVariants' });
export type ButtonProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  React.ComponentProps<typeof ButtonNative>;

const restyleFunctions = [variant, color, spacing, border];

const Component = createRestyleComponent<ButtonProps, Theme>(
  [variant],
  ButtonNative
);

export const Button = ({ children, ...rest }: ButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = useRestyle(restyleFunctions, rest) as any;
  const isDarkMode = useDarkMode();
  const buttonColor = props?.style?.find(() => true).color;

  return (
    <Component color={buttonColor} {...props} dark={!isDarkMode}>
      {children}
    </Component>
  );
};
