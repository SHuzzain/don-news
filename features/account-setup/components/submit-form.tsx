import React from "react";

import SectionView from "@/components/layout/section-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HeadingText from "@/components/ui/heading-text";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { useImagePicker } from "@/hooks/use-image-picker";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import InputIcon from "@/components/ui/input/inputIcon";
import { PlusIcon, UserCircle } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { setupSchema } from "../schema";
import useAuthStore from "@/features/auth/store";

const SubmitForm = () => {
  const form = useFormContext<z.infer<typeof setupSchema>>();
  const { session } = useAuthStore();

  const { pickImage } = useImagePicker({
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  return (
    <>
      <SectionView className="px-5">
        <HeadingText className="text-4xl">
          Fill your {"\n"} information
        </HeadingText>
      </SectionView>

      <SectionView className="items-center my-5">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <View className="relative">
                  <Avatar alt="Zach Nugent's Avatar" className="size-40">
                    <AvatarImage source={{ uri: field.value }} />
                    <AvatarFallback>
                      <Text className="font-semibold text-6xl">
                        {session?.user.user_metadata?.full_name?.length
                          ? session?.user.user_metadata?.full_name[0]
                          : ""}
                      </Text>
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="top-0 right-0 z-10 absolute p-1 rounded-full"
                    onPress={async () => {
                      const result = await pickImage();
                      if (!result) {
                        field.onChange("");
                      }
                      field.onChange(result?.assets[0].uri);
                    }}
                  >
                    <PlusIcon size={20} color={"#60779a"} />
                  </Button>
                </View>
              </FormControl>
            </FormItem>
          )}
        />
      </SectionView>

      <SectionView className="px-5">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputIcon
                  returnKeyType="done"
                  iconPosition="right"
                  placeholder="Full Name"
                  {...field}
                  onChangeText={field.onChange}
                >
                  <UserCircle size={24} color={"#60779a"} />
                </InputIcon>
              </FormControl>
            </FormItem>
          )}
        />
      </SectionView>
    </>
  );
};

export default SubmitForm;
