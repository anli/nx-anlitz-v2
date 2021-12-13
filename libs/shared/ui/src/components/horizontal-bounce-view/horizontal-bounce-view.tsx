import React, { FC, useRef } from 'react';
import NativePagerView, {
  PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view';
import { View } from '../view';
import { PagerView } from './pager-view';

type Props = {
  onStart?: () => void;
  onEnd?: () => void;
};

export const HorizontalBounceView: FC<Props> = ({
  children,
  onStart,
  onEnd,
}) => {
  const ref = useRef<NativePagerView>(null);

  /* istanbul ignore next */
  const handlePageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const position = event.nativeEvent.position;

    if (position !== 1) {
      position ? onEnd?.() : onStart?.();
      ref.current?.setPage(1);
    }
  };

  return (
    <PagerView
      flex={1}
      ref={ref}
      initialPage={1}
      onPageSelected={handlePageSelected}
    >
      <View key="0" />
      <View key="1">{children}</View>
      <View key="2" />
    </PagerView>
  );
};
