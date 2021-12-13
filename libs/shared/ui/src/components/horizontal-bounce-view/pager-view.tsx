import {
  backgroundColor,
  BackgroundColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
} from '@shopify/restyle';
import React from 'react';
import NativePagerView from 'react-native-pager-view';
import { Theme } from '../..';

export type ScreenProps = SpacingProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  React.ComponentProps<typeof NativePagerView> & {
    children?: React.ReactNode;
  };
export const PagerView = createRestyleComponent<ScreenProps, Theme>(
  [spacing, layout, backgroundColor],
  NativePagerView
);
