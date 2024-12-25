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
import { handleFaceBookAuth, handleGoogleAuth } from "../actions";
import { signUpSchema } from "../schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "@/lib/icons/Email";
import { CircleUserRound } from "@/lib/icons/Person-circle";

export default function SignUpCard() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <View className="flex-1 gap-5 bg-background p-5">
      <Text className="mb-5 font-JakartaBold text-5xl text-vogue dark:text-primary">
        Create {"\n"}an account
      </Text>

      <SectionView>
        <Form {...form}>
          <View className="gap-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <InputIcon
                      {...field}
                      returnKeyType="next"
                      keyboardType="default"
                      textContentType="username"
                      iconPosition="right"
                      placeholder="jhon123"
                      isError={!!error?.message}
                      onSubmitEditing={() => form.setFocus("email")}
                      onChangeText={field.onChange}
                    >
                      <CircleUserRound
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
                        onPress={() => {}}
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
