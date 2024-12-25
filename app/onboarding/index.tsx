import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WelComeCard from "@/features/welcome/components";

export default function OnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <WelComeCard />
    </SafeAreaView>
  );
}
