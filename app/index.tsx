import React from "react";
import { Redirect } from "expo-router";
import useAuthStore from "@/features/auth/store";

export default function RootScreen() {
  const { session } = useAuthStore();
  console.log({ session }, "sssssssssssss");
  if (!session) {
    return <Redirect href={"/onboarding"} />;
  }
  return <Redirect href="/(with-auth)/home" />;
}
