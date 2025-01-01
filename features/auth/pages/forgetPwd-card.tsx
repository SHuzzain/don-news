import { KeyboardAvoidingView, Platform, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { Image } from "react-native";
import SectionView from "@/components/layout/section-view";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputIcon from "@/components/ui/input/inputIcon";
import { Mail } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { forgetPwdSchema } from "../schema"; // Ensure correct schema
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import HeadingText from "@/components/ui/heading-text";

export default function ForgetPwdCard() {
  const form = useForm<z.infer<typeof forgetPwdSchema>>({
    resolver: zodResolver(forgetPwdSchema), // Match schema
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgetPwdSchema>) => {
    console.log(values);
    router.push({
      pathname: "/auth/verification",
      params: {
        email: values.email,
        redirect: "/auth/(tab)/sign-in",
      },
    });
  };

  return (
    <View className="flex-1 bg-background p-5">
      <SectionView className="relative flex-[0.4] justify-center">
        <Image
          source={require("@/assets/images/forget-pwd.png")}
          className="absolute size-full"
          resizeMode="contain"
        />
      </SectionView>

      <SectionView className="web:flex flex-[0.7] justify-between">
        <View>
          <HeadingText className="mb-5 leading-tight">
            Forget {"\n"}Password
          </HeadingText>

          <Text className="mb-5 font-JakartaSemiBold text-gray-500 leading-relaxed">
            Enter your old password to reset{"\n"} password
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <InputIcon
                        {...field}
                        returnKeyType="send"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        iconPosition="right"
                        placeholder="jhon@gmail.com"
                        isError={!!error?.message}
                        onSubmitEditing={form.handleSubmit(onSubmit)}
                        onChangeText={field.onChange}
                      >
                        <Mail
                          size={24}
                          color={error?.message ? "red" : "#60779a"}
                        />
                      </InputIcon>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </KeyboardAvoidingView>
        </View>

        <View>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            className="flex flex-row items-center rounded-2xl"
            size="lg"
          >
            <Text className="ml-4 font-Jakarta">Next</Text>
          </Button>
        </View>
      </SectionView>
    </View>
  );
}
