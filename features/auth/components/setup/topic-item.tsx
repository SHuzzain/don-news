import React from "react";
import { ImageBackground, Pressable } from "react-native";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/tw-class";
import { Text } from "@/components/ui/text";
import { z } from "zod";
import { setupSchema } from "../../schema";

interface TopicItemProps {
  title: string;
  image: any;
}

export default function TopicItem({ title, image }: TopicItemProps) {
  const form = useFormContext<z.infer<typeof setupSchema>>();

  // Update topics based on selection
  const updateTopics = (value: string, isChecked: boolean) => {
    const currentTopics = form.getValues("topics") as string[];
    return isChecked
      ? [...currentTopics, value]
      : currentTopics.filter((topic) => topic !== value);
  };

  return (
    <FormField
      control={form.control}
      name="topics"
      render={({ field }) => {
        const isSelected = field.value.includes(title);

        return (
          <FormItem
            className={cn(
              " border-2 mx-2 rounded-3xl flex-1 h-52   overflow-hidden",
              isSelected ? "border-primary" : "border-white",
            )}
          >
            <FormControl className="size-full">
              <Pressable
                onPress={() => field.onChange(updateTopics(title, !isSelected))}
                className=""
              >
                <ImageBackground
                  source={image}
                  className={cn(
                    "p-5 justify-between size-full  items-start",
                    isSelected ? "bg-vogue" : "bg-secondary",
                  )}
                >
                  <Checkbox
                    ref={field.ref}
                    checked={isSelected}
                    onCheckedChange={(isChecked) =>
                      field.onChange(updateTopics(title, isChecked))
                    }
                    className="self-end"
                  />
                  <Text className="font-JakartaExtraBold text-white text-xl">
                    {title}
                  </Text>
                </ImageBackground>
              </Pressable>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
