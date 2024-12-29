import React from "react";
import { Stack } from "expo-router";
import StackHeader from "@/components/ui/stack-header";

export default function SetUpLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <StackHeader skip={"/auth/(tab)/sign-in"} />,
        }}
      />
    </Stack>
  );
}
