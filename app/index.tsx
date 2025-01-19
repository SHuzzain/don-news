import React from "react";
import { Redirect } from "expo-router";
import useAuthStore from "@/features/auth/store";

export default function RootScreen() {
  const { session } = useAuthStore();
  if (!session) {
    return <Redirect href={"/onboarding"} />;
  }

  if (!session.user.initial_setup) {
    return <Redirect href={"/(account-setup)"} withAnchor />;
  }
  return <Redirect href="/(with-auth)/home" />;
}
