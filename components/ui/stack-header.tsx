import React from "react";
import { View, Text, TouchableOpacity, ViewProps } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Href, router } from "expo-router";
import { cn } from "@/lib/utils/tw-class";

type StackHeaderProps = {
  skip?: Href;
  isBack?: boolean | Href;
  title?: string | React.ReactNode;
  className?: ViewProps["className"];
  callBack?: () => void;
};

const StackHeader: React.FC<StackHeaderProps> = ({
  skip,
  isBack = true,
  title = "",
  className,
  callBack,
}) => {
  const { colorScheme } = useColorScheme();

  const handleBackPress = () => {
    if (callBack) callBack();
    if (typeof isBack === "boolean") {
      if (router.canGoBack()) router.back();
    } else {
      router.push(isBack);
    }
  };

  const handleSkipPress = () => {
    if (skip) router.replace(skip);
  };

  return (
    <View
      className={cn(
        "flex flex-row justify-between bg-background px-5 pt-safe",
        className,
      )}
    >
      {title && <Text className="font-semibold text-lg">{title}</Text>}
      {isBack && (
        <TouchableOpacity onPress={handleBackPress}>
          <ArrowLeft
            color={colorScheme === "dark" ? "white" : "black"}
            size={24}
          />
        </TouchableOpacity>
      )}
      {skip && (
        <TouchableOpacity onPress={handleSkipPress}>
          <Text className="font-semibold text-lynch text-md">Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StackHeader;
