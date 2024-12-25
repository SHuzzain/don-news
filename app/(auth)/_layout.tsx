import React from "react";
import { Stack } from "expo-router";
import StackHeader from "@/components/ui/stack-header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthRootLayout() {
  return (
    <SafeAreaView className="flex-1" edges={["left", "right"]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <StackHeader skip={"/(auth)/(tab)/sign-in"} />,
          }}
        />

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
