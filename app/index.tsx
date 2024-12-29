import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import authStore from "@/features/auth/store";
import { ActivityIndicator } from "react-native";

export default function RootScreen() {
  const { fetchAuth, isLoading, profile } = authStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAuth();
    };

    fetchData();
  }, [fetchAuth]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  console.log({ profile });
  // Redirect based on profile state
  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/onboarding" />;
}
