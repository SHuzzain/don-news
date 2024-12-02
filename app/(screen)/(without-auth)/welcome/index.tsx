import { Text, ImageBackground, View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { Button } from "@/components/ui/button";

export default function WelComeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" edges={["left", "right"]}>
        <Swiper style={styles.wrapper} showsPagination={false}>
          <View style={styles.slide}>
            <ImageBackground
              resizeMode="cover"
              source={require("@/assets/images/welcome1.png")}
              className="absolute inset-0 flex-1 justify-center"
            />
            <View className="flex-1 justify-end gap-2 mb-14">
              <Text className="font-bold text-5xl text-white">
                Get the latest
              </Text>
              <Text className="font-bold text-5xl text-white">news from</Text>
              <Text className="font-bold text-5xl text-primary">reliable</Text>
              <Text className="font-bold text-5xl text-primary">source</Text>
            </View>
            <View className="mb-28 px-5 w-full">
              <Button size={"lg"} className="rounded-2xl w-full">
                <Text className="font-semibold text-white text-xl">Next</Text>
              </Button>
            </View>
          </View>
          <View style={styles.slide}>
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
          </View>
          <View style={styles.slide}>
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
          </View>
        </Swiper>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
});
