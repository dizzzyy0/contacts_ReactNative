import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router'; // Використовуємо Stack для однієї сторінки

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}
