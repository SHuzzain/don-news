import { Href, router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  skip?: Href;
};

const StackHeader = ({ skip }: Props) => {
  return (
    <View className="flex flex-row justify-between bg-white px-5">
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {skip && (
        <TouchableOpacity onPress={() => router.push(skip)}>
          <Text className="font-semibold text-lynch text-md">Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StackHeader;
