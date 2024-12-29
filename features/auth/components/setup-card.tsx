import { View, Text } from "react-native";
import React from "react";

export default function SetUpCard() {
  return (
    <View className="flex-1 bg-background p-5">
      <Text className="font-JakartaBold text-4xl text-start text-vogue leading-normal">
        Add your Primary{"\n"}location?
      </Text>
    </View>
  );
}
