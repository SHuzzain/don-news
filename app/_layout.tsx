import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import "react-native-url-polyfill/auto";

import QueryProviders from "@/components/providers/tanstack-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { colorScheme as nativewindColorScheme } from "nativewind";
import StackHeader from "@/components/ui/stack-header";
import { Text } from "@/components/ui/text";
import { StatusBar } from "expo-status-bar";
import useSession from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/loading";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();
nativewindColorScheme.set("system");

export default function RootLayout() {
  const session = useSession();
  const [loaded] = useFonts({
    "Jakarta-Bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("@/assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  // const permissionsGranted = usePermissions();

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || session.isLoading) {
    return <Spinner className="text-red-300" />;
  }

  if (!session.session) {
    return <Redirect href={"/onboarding"} />;
  }

  return (
    <QueryProviders>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />

          <Stack.Screen
            name="(account-setup)"
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
          <Stack.Screen name="(with-auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="policies" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryProviders>
  );
}
