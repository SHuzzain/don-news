import React from 'react';
import { Stack } from 'expo-router';

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name="(without-auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(with-auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
