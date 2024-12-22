import React from "react";
import { Redirect } from "expo-router";

export default function RootScreen() {
  if (true) {
    return <Redirect href={"/onboarding"} />;
  }
}
