import { FlatList } from "react-native";
import React from "react";
import { H4, P } from "@/components/ui/typography";
import InputIcon from "@/components/ui/input/inputIcon";
import SectionView from "@/components/layout/section-view";
import CityItem from "./city-item";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import HeadingText from "@/components/ui/heading-text";
import { useLocationScrollQuery } from "@/hooks/use-location";
import { Skeleton } from "@/components/ui/skeleton";
import { View } from "react-native";
import { SearchIcon } from "lucide-react-native";

type SetUpCardProps = {
  info?: {
    city: {
      name: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
  };
};

export default function CityArea({ info }: SetUpCardProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLocationScrollQuery({
      queryKey: "get-local-city",
      lat: info?.location.latitude ?? NaN,
      lng: info?.location.longitude ?? NaN,
      query: `neighborhoods near area`,
      type: "sublocality_level_1",
    });
  const form = useFormContext();

  return (
    <>
      <SectionView className="px-5">
        <HeadingText className="text-4xl">
          Add your Primary{"\n"}location?
        </HeadingText>
        <P className="mt-3 text-lg">
          Discover what's happening around <H4>{info?.city.name ?? ""}</H4> and
          its surroundings area
        </P>
      </SectionView>

      <SectionView className="px-5">
        <FormField
          control={form.control}
          name="search"
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
        data={data?.pages?.flatMap((page) => page.results) ?? []}
        renderItem={({ item }) => <CityItem {...item} />}
        keyExtractor={(item, index) => `${item.place_id}-${index}-${item.name}`}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>
          hasNextPage ? (
            <>
              {isFetchingNextPage && (
                <View className="gap-5">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="rounded-3xl h-20" />
                  ))}
                </View>
              )}
            </>
          ) : null
        }
      />
    </>
  );
}
