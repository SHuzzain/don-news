import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { setupSchema } from "../schema";
import { Session } from "@supabase/supabase-js";
import { getLocationInfo } from "@/actions/location-fn";
import env from "@/config/env";
import axios from "axios";
import { uploadFile } from "@/actions/uploads";

export const accountSetUp = async (
  values: z.infer<typeof setupSchema>,
  user: Session["user"],
) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        email: user.email,
        username: values.username,
        categories: values.topics,
        sources: values.newsSources,
        initial_setup: true,
      })
      .eq("id", user.id);
    if (error) throw error;

    const data = await uploadFile(values.avatar, user.id);
    if (data) {
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: data.fullPath,
        })
        .eq("id", user.id);

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error("ACCOUNT_SETUP", error);
    return false;
  }
};

export const getCategories = async () => {
  try {
    let { data, error } = await supabase.from("categories").select("*");

    if (error || !data) throw error;

    return data;
  } catch (error) {
    console.error("[GET_CATEGORIES]", error);
    return [];
  }
};

export const getNewSource = async () => {
  try {
    let { data: news_sources, error } = await supabase
      .from("news_sources")
      .select("*");

    if (error || !news_sources) throw error;

    return news_sources;
  } catch (error) {
    console.error("[GET_NEWS_SOURCE]", error);
    return [];
  }
};

export const getCityName = async () => {
  try {
    const location = await getLocationInfo();

    if (location) {
      let cityInfo = location?.city?.name;

      return {
        city: cityInfo || null,
      };
    }
  } catch (error) {
    console.error("[GET_CITY_NAME]", error);
    throw error;
  }
};

export const getLocalCity = async (textSearch: string) => {
  const location = await getLocationInfo();

  if (location) {
    let cityInfo = location?.city?.name;
    const { latitude, longitude } = location.location;

    const textSearchResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `neighborhoods near ${cityInfo} ${textSearch ? `in ${textSearch}` : ""}`,
          location: `${latitude},${longitude}`,
          type: "sublocality",
          radius: 5000,
          key: env.GOOGLE_MAP_KEY,
        },
      },
    );
  }

  return location;
};
