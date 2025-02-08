import { TouchableOpacity, View } from "react-native";
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
import { Text } from "@/components/ui/text";
import { handleAuth, handleSignUp } from "../../actions";
import { signUpSchema } from "../../schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "@/lib/icons/Email";
import HeadingText from "@/components/ui/heading-text";
import { router } from "expo-router";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

export default function SignUpCard() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await handleSignUp(values);
      router.push({
        pathname: "/auth/verification",
        params: {
          email: values.email,
          redirect: "/account-setup",
        },
      });
    } catch (error) {
      if (error && typeof error === "object") {
        toast({
          variant: "destructive",
          description: (error as AuthError).message,
        });
      } else {
        console.error("[ONSUMBIT_SIGN_UP]", error);
      }
    }
  }
  return (
    <View className="flex-1 gap-5 bg-background p-5">
      <HeadingText>Create {"\n"}an account</HeadingText>

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
                      isError={!!error?.message}
                      onSubmitEditing={form.handleSubmit(onSubmit)}
                      onChangeText={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="ml-2">
                  <FormControl className="web:flex flex-row items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      {...field}
                    />
                    <Text>
                      I have read{"  "}
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => router.push("/policies")}
                        className="mt-0.5"
                      >
                        <Text className="font-JakartaBold text-primary">
                          term & Aggreenment
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </View>
        </Form>
      </SectionView>

      <SectionView className="justify-end gap-3 mt-auto">
        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center rounded-2xl"
          size={"lg"}
        >
          <Text>Sign Up</Text>
        </Button>

        <Text className="my-5 text-center">Or sign up with</Text>
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
