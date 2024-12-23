import { View, Pressable } from "react-native";
import React from "react";
import SectionView from "@/components/layout/section-view";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputIcon from "@/components/ui/input/inputIcon";
import MaterialIocs from "react-native-vector-icons/MaterialCommunityIcons";
import InputPwf from "@/components/ui/input/input-pwd";
import { signInSchema } from "../schema";
import { Text } from "@/components/ui/text";

export default function SignInCard() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <View className="gap-5 bg-white p-5 h-full">
      <Text className="mb-5 font-JakartaBold text-5xl text-vogue">
        Let's Sign {"\n"}You In
      </Text>

      <SectionView className="flex-1">
        <Form {...form}>
          <View className="gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      {...field}
                      returnKeyType="next"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      iconPosition="right"
                      placeholder="jhon@gmail.com"
                      isError={!!error?.message}
                      onChangeText={field.onChange}
                    >
                      <MaterialIocs
                        name="email-outline"
                        color={error?.message ? "red" : "#60779a"}
                        size={24}
                      />
                    </InputIcon>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <InputPwf
                      {...field}
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
      </SectionView>

      <SectionView className="flex-1 justify-end">
        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
        >
          <Text>Sign In</Text>
        </Button>

        <Pressable>
          <Text>Or sign in With</Text>
        </Pressable>
      </SectionView>
    </View>
  );
}
