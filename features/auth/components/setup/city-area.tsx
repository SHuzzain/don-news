import { FlatList } from "react-native";
import React from "react";
import { LocationGeocodedAddress } from "expo-location";
import { H4, P } from "@/components/ui/typography";
import InputIcon from "@/components/ui/input/inputIcon";
import { SearchIcon } from "lucide-react-native";
import SectionView from "@/components/layout/section-view";
import { city } from "@/features/auth/constant";
import CityItem from "./city-item";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import HeadingText from "../heading-text";

type SetUpCardProps = {
  data: LocationGeocodedAddress;
};

export default function CityArea({ data }: SetUpCardProps) {
  const form = useFormContext();
  return (
    <>
      <SectionView className="px-5">
        <HeadingText className="text-4xl">
          Add your Primary{"\n"}location?
        </HeadingText>
        <P className="mt-3 text-lg">
          Discover what's happening around <H4>{data.city}</H4> and its
          surroundings area
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
        data={
          Object.hasOwn(city, String(data.city).toLowerCase())
            ? city[String(data.city).toLowerCase()]
            : []
        }
        renderItem={({ item }) => <CityItem name={item} />}
        keyExtractor={(item) => item}
      />
    </>
  );
}
