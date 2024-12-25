import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import "react-native-url-polyfill/auto";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import QueryProviders from "@/components/providers/tanstack-query-provider";
import StackHeader from "@/components/ui/stack-header";
import { Text } from "@/components/ui/text";
import { colorScheme as nativewindColorScheme } from "nativewind";
import { ThemeProvider } from "@/components/providers/theme-provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

nativewindColorScheme.set("system");

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProviders>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          <Stack.Screen
            name="onboarding/index"
            options={{
              header: () => (
                <StackHeader
                  isBack={false}
                  skip={"/(auth)"}
                  title={
                    <Text className="font-JakartaBold text-3xl">
                      Don{" "}
                      <Text className="font-JakartaBold text-primary text-xl">
                        News
                      </Text>
                    </Text>
                  }
                />
              ),
            }}
          />
          <Stack.Screen name="(with-auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryProviders>
  );
}
