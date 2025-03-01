import React from "react";
import { FlatList } from "react-native";
import { useFormContext } from "react-hook-form";

import { SearchIcon } from "lucide-react-native";

import TopicItem from "./topic-item";

import InputIcon from "@/components/ui/input/inputIcon";
import SectionView from "@/components/layout/section-view";
import HeadingText from "@/components/ui/heading-text";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../action";

export default function Topic() {
  const form = useFormContext();
  const { data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData: [...Array(5)].map((_, index) => ({ id: String(index) })),
  });

  return (
    <>
      <SectionView className="px-5">
        <HeadingText className="text-4xl">Choose your{"\n"}topic</HeadingText>
      </SectionView>

      <SectionView className="flex-1 px-5">
        <FormField
          control={form.control}
          name="searchTopic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputIcon
                  iconPosition="left"
                  placeholder="Search Local Area"
                  {...field}
                  onChangeText={field.onChange}
                >
                  <SearchIcon size={24} color={"#60779a"} />
                </InputIcon>
              </FormControl>
            </FormItem>
          )}
        />

        <FlatList
          data={data}
          numColumns={2}
          scrollEnabled
          contentContainerClassName="gap-5 mt-5 pb-28"
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <TopicItem {...item} loading={isFetching} />
          )}
        />
      </SectionView>
    </>
  );
}
