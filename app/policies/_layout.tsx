import StackHeader from "@/components/ui/stack-header";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Policieslayout() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <StackHeader />,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
