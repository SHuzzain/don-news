import React from "react";
import SectionView from "@/components/layout/section-view";
import { Text, View, ImageBackground } from "react-native";
import { SlideItem } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tw-class";

const Slider = (props: SlideItem & { handleActive: () => void }) => {
  const { buttonText, img, text, handleActive } = props;

  return (
    <SectionView className={cn(" relative flex-1 items-center justify-center")}>
      <ImageBackground
        resizeMode="cover"
        source={img}
        className="inset-0 flex-1 justify-center w-full h-full"
      >
        <View className="flex-1 justify-end gap-2 mb-14 px-5">
          {text.map((tx, txIndex) => {
            if ("combine" in tx) {
              const { primary, white } = tx.combine!;
              return (
                <Text
                  key={`${txIndex}`}
                  className="font-bold text-5xl text-primary"
                >
                  {primary}
                  <Text className="text-white">{white}</Text>
                </Text>
              );
            }

            if ("combineW" in tx) {
              const { primary, white } = tx.combineW!;
              return (
                <Text
                  key={`${txIndex}`}
                  className="font-bold text-5xl text-white"
                >
                  {primary}
                  <Text className="text-primary">{white}</Text>
                </Text>
              );
            }

            if ("white" in tx) {
              return (
                <Text
                  key={`${txIndex}`}
                  className="font-bold text-5xl text-white"
                >
                  {tx.white}
                </Text>
              );
            }

            if ("primary" in tx) {
              return (
                <Text
                  key={`${txIndex}`}
                  className="font-bold text-5xl text-primary"
                >
                  {tx.primary}
                </Text>
              );
            }

            return null;
          })}
          <View className="mt-12 px-5 w-full">
            <Button
              size="lg"
              className="rounded-2xl w-full"
              onPress={handleActive}
            >
              <Text className="font-semibold text-white text-xl">
                {buttonText}
              </Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SectionView>
  );
};

export default Slider;
