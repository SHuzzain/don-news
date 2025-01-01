import React from "react";
import VerficationCard from "@/features/auth/pages/verfication-card";
import { useLocalSearchParams } from "expo-router";

export default function VerificationScreen() {
  const params = useLocalSearchParams();
  return <VerficationCard meta={params as any} />;
}
