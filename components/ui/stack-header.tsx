import { useTheme } from "@react-navigation/native";
import { Href, router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  skip?: Href;
  isBack?: boolean;
  title?: string | React.ReactNode;
};

const StackHeader = ({ skip, isBack = true, title = "" }: Props) => {
  const { dark } = useTheme();

  return (
    <View className="flex flex-row justify-between bg-background px-5 pt-safe">
      {title}
      {isBack && (
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={dark ? "white" : "black"} />
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
