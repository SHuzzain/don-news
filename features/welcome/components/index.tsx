import { TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { Text } from "@/components/ui/text";
import { sliderData } from "../constant";
import { router } from "expo-router";
import Slider from "./slider";
import SectionView from "@/components/layout/section-view";

export default function WelComeCard() {
  const swiperRef = useRef<Swiper>(null);
  return (
    <View className="flex-1 justify-between items-center bg-white px-5 pt-2 pb-5 h-full">
      <SectionView className="flex-row justify-between px-2 w-full">
        <Text className="font-JakartaBold text-3xl">
          Don{" "}
          <Text className="font-JakartaBold text-primary text-xl">News</Text>
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-up")}
          className=""
        >
          <Text className="font-bold text-lynch text-md">Skip</Text>
        </TouchableOpacity>
      </SectionView>

      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        className="rounded-3xl"
      >
        {sliderData.map((item, index, currentArray) => (
          <Slider
            key={index}
            {...item}
            handleActive={() => {
              if (index === currentArray.length - 1) {
                router.replace("/(auth)/sign-up");
              } else {
                swiperRef.current?.scrollTo(index + 1);
              }
            }}
          />
        ))}
      </Swiper>
    </View>
  );
}
