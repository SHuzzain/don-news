import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/features/auth/actions";

export default function HomeScreen() {
  return (
    <View>
      <Button onPress={() => logoutUser()}>
        <Text>HomeScreen</Text>
      </Button>
    </View>
  );
}
