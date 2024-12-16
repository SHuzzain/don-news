import { TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { Text } from "@/components/ui/text";
import { sliderData } from "../constant";
import { router } from "expo-router";
import Slider from "./slider";

export default function WelComeCard() {
  const swiperRef = useRef<Swiper>(null);
  return (
    <View className="relative flex-1 justify-between items-center h-full">
      <TouchableOpacity
        onPress={() => router.replace("/(without-auth)/sign-up")}
        className="z-10 absolute flex justify-end items-end px-5 py-2 w-full"
      >
        <Text className="font-JakartaBold text-md text-primary">Skip</Text>
      </TouchableOpacity>
      <Swiper ref={swiperRef} loop={false} showsPagination={false}>
        {sliderData.map((item, index, currentArray) => (
          <Slider
            key={index}
            {...item}
            handleActive={() => {
              if (index === currentArray.length - 1) {
                router.replace("/(without-auth)/sign-up");
              } else {
                swiperRef.current?.scrollTo(index + 1);
              }
            }}
          />
        ))}
      </Swiper>

      {/* <SectionView style={styles.slide}>
            <ImageBackground
              resizeMode="cover"
              source={require("@/assets/images/welcome2.png")}
              className="absolute inset-0 flex-1 justify-center"
            />
            <View className="flex-1 justify-end gap-2 mb-14">
              <Text className="font-bold text-5xl text-white">
                Still{" "}
                <Text className="font-bold text-5xl text-primary">
                  up to date
                </Text>
              </Text>
              <Text className="font-bold text-5xl text-white">
                news from all
              </Text>
              <Text className="font-bold text-5xl text-white">world</Text>
            </View>
            <View className="mb-28 px-5 w-full">
              <Button size={"lg"} className="rounded-2xl w-full">
                <Text className="font-semibold text-white text-xl">Next</Text>
              </Button>
            </View>
          </SectionView>
          <SectionView style={styles.slide}>
            <ImageBackground
              resizeMode="cover"
              source={require("@/assets/images/welcome.png")}
              className="absolute inset-0 flex-1 justify-center"
            />
            <View className="flex-1 justify-end gap-2 mb-14">
              <Text className="font-bold text-5xl text-white">
                From art to politics,
              </Text>
              <Text className="font-bold text-5xl text-primary">
                anything
                <Text className="font-bold text-5xl text-white"> in</Text>
              </Text>
              <Text className="font-bold text-5xl text-white">Don News</Text>
            </View>
            <View className="mb-28 px-5 w-full">
              <Button size={"lg"} className="rounded-2xl w-full">
                <Text className="font-semibold text-white text-xl">
                  Get Start
                </Text>
              </Button>
            </View>
          </SectionView> */}
    </View>
  );
}
