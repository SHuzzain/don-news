import { Pressable, View } from "react-native";
import React from "react";
import { P } from "@/components/ui/typography";
import SectionView from "@/components/layout/section-view";
import InputOTP from "@/components/ui/input/input-otp";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import HeadingText from "@/components/ui/heading-text";

export default function VerficationCard() {
  return (
    <View className="flex-1 bg-background p-5">
      <SectionView className="mt-10">
        <HeadingText>VerficationCard</HeadingText>
        <P className="my-5 text-lg text-muted-foreground">
          Enter your verfication code the we{"\n"}sent you through your email
        </P>

        <InputOTP maxLength={4} onSubmit={(value) => console.log(value)} />
      </SectionView>

      <SectionView className="flex justify-center mt-auto">
        <P className="my-5 w-full text-center text-lg text-muted-foreground">
          Haven't received the code?{" "}
          <Pressable>
            <Text className="ml-2 font-JakartaBold text-primary">
              Resend Code
            </Text>
          </Pressable>
        </P>

        <Button
          onPress={() => router.replace("/(account-setup)")}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
        >
          <Text>Verify</Text>
        </Button>
      </SectionView>
    </View>
  );
}
