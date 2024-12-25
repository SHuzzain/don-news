import { Href, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
type Props = {
  skip?: Href;
  isBack?: boolean;
  title?: string | React.ReactNode;
};

const StackHeader = ({ skip, isBack = true, title = "" }: Props) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-row justify-between bg-background px-5 pt-safe">
      {title}
      {isBack && (
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft
            color={colorScheme === "dark" ? "white" : "black"}
            size={24}
          />
        </TouchableOpacity>
      )}
      {skip && (
        <TouchableOpacity onPress={() => router.push(skip)}>
          <Text className="font-semibold text-lynch text-md">Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StackHeader;
