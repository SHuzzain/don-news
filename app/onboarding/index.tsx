import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WelComeCard from "@/features/welcome/components";

export default function OnboardingScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" edges={["left", "right"]}>
        <WelComeCard />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
