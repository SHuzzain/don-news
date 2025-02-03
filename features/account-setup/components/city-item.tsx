import { Pressable, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/tw-class";
import SectionView from "@/components/layout/section-view";

export default function CityItem(props: { name: string }) {
  const { name } = props;
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="primaryArea"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Pressable onPress={() => field.onChange(props)}>
              <View
                className={cn(
                  "flex-1 rounded-3xl h-20 flex-row px-5 items-center justify-between",
                  field.value?.name === name ? "bg-vogue" : "bg-secondary",
                )}
              >
                <SectionView className="flex flex-row items-center gap-5">
                  <Text className="text-muted-foreground">
                    {name.includes(" ")
                      ? name.split(" ")[0][0].concat(name.split(" ")[1][0])
                      : name[0].concat(name[1])}
                  </Text>

                  <Text
                    className={cn(
                      field.value?.name === name ? "text-white" : "text-black",
                      "text-lg",
                    )}
                  >
                    {name}
                  </Text>
                </SectionView>

                <SectionView>
                  <Checkbox
                    checked={field.value?.name === name}
                    onCheckedChange={() => field.onChange(props)}
                    {...field}
                  />
                </SectionView>
              </View>
            </Pressable>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
