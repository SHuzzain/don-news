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
import { useForm } from "react-hook-form";
import { updatePwdSchema } from "../schema"; // Ensure correct schema
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import InputPwf from "@/components/ui/input/input-pwd";

export default function UpdatePwdCard() {
  const form = useForm<z.infer<typeof updatePwdSchema>>({
    resolver: zodResolver(updatePwdSchema), // Match schema
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof updatePwdSchema>) => {
    console.log(values);
    router.push("auth/(tab)/sign-in");
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
          <Text className="mb-5 font-JakartaBold text-5xl text-secondary-foreground leading-relaxed">
            Forget {"\n"}Password
          </Text>

          <Text className="mb-5 font-JakartaSemiBold text-gray-500 leading-relaxed">
            Enter your new password to reset{"\n"} old password
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
          >
            <Form {...form}>
              <View className="gap-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormControl>
                        <InputPwf
                          {...field}
                          IconPosition="left"
                          returnKeyType="next"
                          onSubmitEditing={() =>
                            form.setFocus("confirmPassword")
                          }
                          onChangeText={field.onChange}
                          isError={!!error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormControl>
                        <InputPwf
                          {...field}
                          IconPosition="left"
                          onSubmitEditing={form.handleSubmit(onSubmit)}
                          onChangeText={field.onChange}
                          isError={!!error?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </View>
            </Form>
          </KeyboardAvoidingView>
        </View>

        <View>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            className="flex flex-row items-center rounded-2xl"
            size="lg"
          >
            <Text className="ml-4 font-Jakarta">Submit</Text>
          </Button>
        </View>
      </SectionView>
    </View>
  );
}
