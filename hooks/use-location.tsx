import { getLocationInfo } from "@/actions/location-fn";
import env from "@/config/env";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";

interface LocationQueryProps {
  queryKey: string;
  lat?: number;
  lng?: number;
  query: string;
  radius?: number; // Radius for search (in meters)
  textSearch?: string;
  type?:
    | "political"
    | "sublocality"
    | "locality"
    | "sublocality_level_1"
    | "sublocality_level_2";
}

export const useLocationScrollQuery = ({
  queryKey,
  lat,
  lng,
  query,
  radius,
  textSearch,
  type,
}: LocationQueryProps) => {
  const fetchLocation = async ({
    pageParam = "",
  }: {
    pageParam: string | null;
  }) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/textsearch/json",
        {
          params: {
            query: query.concat(textSearch ?? ""),
            location: `${lat},${lng}`,
            radius: radius,
            pagetoken: pageParam,
            key: env.GOOGLE_MAP_KEY,
            type,
          },
        },
      );
      if (response.status === 200) {
        console.log({ response });
        return {
          results: response.data.results,
          next_page_token: response.data.next_page_token,
        };
      }
      return { results: [], next_page_token: null };
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchLocation,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.next_page_token ?? null,
  });

  // Handle possible errors outside the hook
  if (error) {
    console.error("[LOCATION_QUERY_HOOK]", error);
    return {
      message: "Failed to fetch",
      success: false,
      error,
      status: "error",
    };
  }

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};

export const useLocationInfo = () => {
  const fnQuery = useQuery({
    queryKey: ["locationInfo"],
    queryFn: getLocationInfo,
    staleTime: Infinity,
  });

  return fnQuery;
};
