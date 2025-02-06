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
import { signInSchema } from "../../schema";
import { Text } from "@/components/ui/text";
import { handleAuth, handleSignIn } from "../../actions";
import { Mail } from "@/lib/icons/Email";
import { Link } from "expo-router";
import { router } from "expo-router";
import HeadingText from "@/components/ui/heading-text";

export default function SignInCard() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      credential: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      await handleSignIn(values);
      router.replace("/account-setup");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View className="flex-1 gap-5 bg-background p-5">
      <HeadingText className="mb-5">Let's Sign {"\n"}You In</HeadingText>

      <SectionView>
        <Form {...form}>
          <View className="gap-5">
            <FormField
              control={form.control}
              name="credential"
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
            <Link push href={"/auth/forget-pwd"} className="ml-1 text-gray-500">
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
            onPress={() => handleAuth("google")}
          >
            <MaterialIocs name="google" color={"black"} size={24} />
            <Text className="ml-4 font-Jakarta text-black">Google</Text>
          </Button>

          <Button
            className="flex flex-row items-center rounded-2xl"
            variant={"secondary"}
            size={"lg"}
            onPress={() => handleAuth("facebook")}
          >
            <MaterialIocs name="facebook" color={"black"} size={24} />
            <Text className="ml-4 font-Jakarta text-black">Facebook</Text>
          </Button>
        </View>
      </SectionView>
    </View>
  );
}
