import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({
  children,
  bg = '#fff',
  ...props
}) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  return (
    <View style={{ paddingTop, backgroundColor: bg, flex: 1, ...props.style }}>{children}</View>
  );
};

export default ScreenWrapper;
