import { ImageBackground, Pressable, View } from "react-native";
import React from "react";
import SectionView from "@/components/layout/section-view";
import { Button } from "@/components/ui/button";
import MaterialIocs from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "@/components/ui/text";
import { handleFaceBookAuth, handleGoogleAuth } from "../actions";
import { router } from "expo-router";
import { Mail } from "lucide-react-native";
export default function AuthCard() {
  return (
    <View className="flex flex-1 gap-5 p-5">
      <SectionView className="relative flex-[0.6] rounded-3xl overflow-hidden">
        <ImageBackground
          source={require("@/assets/images/welcome1.png")}
          className="absolute inset-0 flex justify-end p-5 size-full"
          resizeMode="cover"
        >
          <Text className="font-JakartaBold text-4xl text-start text-white leading-snug">
            Sign In {"\n"}options.
          </Text>
        </ImageBackground>
      </SectionView>

      <SectionView className="relative flex-[0.4] gap-5">
        <Button
          onPress={() => router.push("/(auth)/(tab)/sign-in")}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
        >
          <Mail size={24} color={"#fff"} />
          <Text className="ml-4 font-Jakarta text-white">
            Continue with Email
          </Text>
        </Button>

        <Button
          variant={"secondary"}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
          onPress={handleGoogleAuth}
        >
          <MaterialIocs name="google" color={"black"} size={24} />
          <Text className="ml-4 font-Jakarta text-black">
            Sign In with Google
          </Text>
        </Button>

        <Button
          className="flex flex-row items-center rounded-2xl"
          variant={"secondary"}
          size={"lg"}
          onPress={handleFaceBookAuth}
        >
          <MaterialIocs name="facebook" color={"black"} size={24} />
          <Text className="ml-4 font-Jakarta text-black">
            Sign In with Facebook
          </Text>
        </Button>

        <View className="web:flex flex-row justify-center items-center gap-2">
          <Text className="text-center text-lynch">Dont't have account?</Text>
          <Pressable onPress={() => router.push("/(auth)/(tab)/sign-up")}>
            <Text className="font-JakartaBold text-primary"> Sign Up</Text>
          </Pressable>
        </View>
      </SectionView>
    </View>
  );
}
