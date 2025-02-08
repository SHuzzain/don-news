import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import "../global.css";
import "react-native-url-polyfill/auto";
import "react-native-reanimated";
import "react-native-gesture-handler";

import QueryProviders from "@/components/providers/tanstack-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { colorScheme as nativewindColorScheme } from "nativewind";
import StackHeader from "@/components/ui/stack-header";
import { Text } from "@/components/ui/text";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/components/providers/auth-provider";
import { PortalHost } from "@rn-primitives/portal";
import { Toaster } from "@/components/ui/toaster";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "@/features/auth/store";

SplashScreen.preventAutoHideAsync();
nativewindColorScheme.set("system");

export default function RootLayout() {
  const { isLoading } = useAuthStore();
  const [loaded] = useFonts({
    "Jakarta-Bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });
  React.useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, loaded]);

  return (
    <QueryProviders>
      <ThemeProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen
              name="account-setup"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="onboarding/index"
              options={{
                header: () => (
                  <StackHeader
                    isBack={false}
                    skip={"/auth"}
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
            <Stack.Screen name="with-auth" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="policies" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
          <AuthProvider />
          <Toaster />
          <PortalHost />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryProviders>
  );
}
