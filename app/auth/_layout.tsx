import React from "react";
import { Stack } from "expo-router";
import * as Linking from "expo-linking";
import StackHeader from "@/components/ui/stack-header";
import { SafeAreaView } from "react-native-safe-area-context";
import { createSessionFromUrl } from "@/features/auth/actions";

export default function AuthRootLayout() {
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <StackHeader skip={"/auth/(tab)/sign-in"} />,
          }}
        />

        <Stack.Screen
          name="update-pwd"
          options={{
            header: () => <StackHeader />,
          }}
        />
        <Stack.Screen
          name="forget-pwd"
          options={{
            header: () => <StackHeader />,
          }}
        />

        <Stack.Screen
          name="verification"
          options={{
            header: () => <StackHeader />,
          }}
        />
        <Stack.Screen name="setup" options={{ headerShown: false }} />

        <Stack.Screen
          name="(tab)"
          options={{
            header: () => <StackHeader />,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
