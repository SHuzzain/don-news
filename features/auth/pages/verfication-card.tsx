import { Pressable, View } from "react-native";
import React from "react";
import { P } from "@/components/ui/typography";
import SectionView from "@/components/layout/section-view";
import InputOTP from "@/components/ui/input/input-otp";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Href, router } from "expo-router";
import HeadingText from "@/components/ui/heading-text";
import { handleOtp } from "../actions";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema } from "../schema";
import { z } from "zod";
import { MAX_OTP_LENGTH } from "../constant";

type VerficationCardProps = {
  meta: {
    email: string;
    redirect: Href;
    routerType?: string;
  };
};

export default function VerficationCard({ meta }: VerficationCardProps) {
  const form = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: Array(MAX_OTP_LENGTH).fill(""), // Ensure length matches MAX_OTP_LENGTH
    },
  });

  async function onSubmit(value: z.infer<typeof verifyOtpSchema>) {
    try {
      const data = await handleOtp({
        email: meta.email,
        token: value.otp.join(""),
        type: "signup",
      });
      console.log("OTP Submission Success:", data);
      await router.replace(meta.redirect);
    } catch (error) {
      console.error("OTP_ERROR", error);
    }
  }

  return (
    <Form {...form}>
      <View className="flex-1 bg-background p-5">
        <SectionView className="mt-10">
          <HeadingText>VerficationCard</HeadingText>
          <P className="my-5 text-lg text-muted-foreground">
            Enter your verfication code the we{"\n"}sent you through your email
          </P>

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={MAX_OTP_LENGTH}
                    onChange={field.onChange}
                    autoTrigger={() => form.handleSubmit(onSubmit)()}
                    otpValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            onPress={() => form.handleSubmit(onSubmit)}
            className="flex flex-row items-center rounded-2xl"
            size={"lg"}
          >
            <Text>Verify</Text>
          </Button>
        </SectionView>
      </View>
    </Form>
  );
}
