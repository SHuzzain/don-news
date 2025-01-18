import React from "react";
import { Redirect, Stack } from "expo-router";
import useSession from "@/hooks/use-auth";

export default function SetUpLayout() {
  const { session } = useSession();

  if (session?.user.initial_setup) {
    return <Redirect href={"/(with-auth)/home"} />;
  }

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
