import { View } from "react-native";
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
import { handleFaceBookAuth, handleGoogleAuth } from "../actions";
import { Mail } from "@/lib/icons/Email";
import { Link } from "expo-router";

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
    <View className="flex-1 gap-5 bg-background p-5">
      <Text className="mb-5 font-JakartaBold text-5xl text-secondary-foreground leading-relaxed">
        Let's Sign {"\n"}You In
      </Text>

      <SectionView>
        <Form {...form}>
          <View className="gap-5">
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
                      onSubmitEditing={() => form.setFocus("password")}
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

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <InputPwf
                      {...field}
                      onSubmitEditing={form.handleSubmit(onSubmit)}
                      onChangeText={field.onChange}
                      isError={!!error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={"/auth/forget-pwd"} className="ml-1 text-gray-500">
              forget password?
            </Link>
          </View>
        </Form>
      </SectionView>

      <SectionView className="justify-end gap-3 mt-auto">
        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
        >
          <Text>Sign In</Text>
        </Button>

        <Text className="my-5 text-center">Or sign in with</Text>
        <View className="web:flex flex-row gap-5">
          <Button
            variant={"secondary"}
            className="flex flex-row items-center rounded-2xl"
            size={"lg"}
            onPress={handleGoogleAuth}
          >
            <MaterialIocs name="google" color={"black"} size={24} />
            <Text className="ml-4 font-Jakarta text-black">Google</Text>
          </Button>

          <Button
            className="flex flex-row items-center rounded-2xl"
            variant={"secondary"}
            size={"lg"}
            onPress={handleFaceBookAuth}
          >
            <MaterialIocs name="facebook" color={"black"} size={24} />
            <Text className="ml-4 font-Jakarta text-black">Facebook</Text>
          </Button>
        </View>
      </SectionView>
    </View>
  );
}
