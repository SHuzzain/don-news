import { FlatList } from "react-native";
import React from "react";

import InputIcon from "@/components/ui/input/inputIcon";
import { SearchIcon } from "lucide-react-native";
import SectionView from "@/components/layout/section-view";
import { newsSourcesItems } from "@/features/account-setup/constant";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

import NewsSourceItem from "./news-source-item";
import HeadingText from "@/components/ui/heading-text";
import { getNewSource } from "../action";
import { useQuery } from "@tanstack/react-query";

export default function NewsSources() {
  const form = useFormContext();

  const { data, isFetching } = useQuery({
    queryKey: ["new-source"],
    queryFn: getNewSource,
    initialData: [...Array(4)].map((_, index) => ({ id: index })),
  });
  console.log({ data });
  return (
    <>
      <SectionView className="px-5">
        <HeadingText className="text-4xl">
          Choose your{"\n"}news sources?
        </HeadingText>
      </SectionView>

      <SectionView className="px-5">
        <FormField
          control={form.control}
          name="searchNews"
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
      </SectionView>

      <FlatList
        contentContainerClassName="gap-5 px-5 pb-24"
        scrollEnabled
        data={data}
        numColumns={2}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <NewsSourceItem {...item} loading={isFetching} />
        )}
      />
    </>
  );
}
