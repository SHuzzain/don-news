import React from "react";
import { ImageBackground, Pressable } from "react-native";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/tw-class";
import { Text } from "@/components/ui/text";
import { z } from "zod";
import { setupSchema } from "../schema";
import { Skeleton } from "@/components/ui/skeleton";

interface TopicItemProps {
  title?: string;
  image_url?: any;
  loading?: boolean;
  id: string;
}

export default function TopicItem({
  title,
  image_url,
  loading = false,
  id,
}: TopicItemProps) {
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
        const isSelected = field.value.includes(id);

        return (
          <FormItem
            className={cn(
              " border-2 mx-2 rounded-3xl flex-1 h-52   overflow-hidden",
              isSelected ? "border-primary" : "border-white",
            )}
          >
            <FormControl className="size-full">
              {loading ? (
                <Skeleton className="size-full" />
              ) : (
                <Pressable
                  onPress={() => field.onChange(updateTopics(id, !isSelected))}
                >
                  <ImageBackground
                    source={{
                      uri: image_url,
                    }}
                    className={cn(
                      "p-5 justify-between size-full  items-start",
                      isSelected ? "bg-vogue" : "bg-secondary",
                    )}
                  >
                    <Checkbox
                      ref={field.ref}
                      checked={isSelected}
                      onCheckedChange={(isChecked) =>
                        field.onChange(updateTopics(id, isChecked))
                      }
                      className="self-end"
                    />
                    <Text className="font-JakartaExtraBold text-lg text-white capitalize">
                      {title}
                    </Text>
                  </ImageBackground>
                </Pressable>
              )}
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
