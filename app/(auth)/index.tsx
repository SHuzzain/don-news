import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AuthCard from "@/features/auth/components";

export default function AuthPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <AuthCard />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
