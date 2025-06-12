import React from 'react';
import { GestureResponderEvent, Pressable, View, useColorScheme } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function CustomTabBarButton({ children, onPress }: Props) {
  const scheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: scheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
        borderless: false,
        radius: 24,
      }}
      style={({ pressed }) => [
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    </Pressable>
  );
}
