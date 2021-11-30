import {
  color,
  ColorProps,
  createRestyleComponent,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { IconButton as IconButtonNative } from 'react-native-paper';
import { Theme } from '../../themes';

const variant = createVariant({ themeKey: 'iconButtonVariants' });
export type IconButtonProps = ColorProps<Theme> &
  VariantProps<Theme, 'iconButtonVariants'> &
  React.ComponentProps<typeof IconButtonNative>;

const restyleFunctions = [variant, color];

const Component = createRestyleComponent<IconButtonProps, Theme>(
  [variant],
  IconButtonNative
);

export const IconButton = ({ ...rest }: IconButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = useRestyle(restyleFunctions, rest) as any;
  const buttonColor = props?.style?.find(() => true).color;

  return <Component color={buttonColor} {...props} />;
};
