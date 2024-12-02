import React from "react";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome/index" options={{ headerShown: false }} />
    </Stack>
  );
}
