import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function RootScreen() {
  if (true) {
    return <Redirect href={"/(screen)/(without-auth)/welcome"} />;
  }
  return (
    <View>
      <Text>RootScreen</Text>
    </View>
  );
}
