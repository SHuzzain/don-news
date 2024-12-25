import { View } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { sliderData } from "../constant";
import { router } from "expo-router";
import Slider from "./slider";

export default function WelComeCard() {
  const swiperRef = useRef<Swiper>(null);
  return (
    <View className="flex-1 justify-between items-center px-5 pt-2 pb-5">
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
                router.replace("/(auth)");
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
