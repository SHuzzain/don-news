import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { setupSchema } from "../schema";
import { Session } from "@supabase/supabase-js";
import { getLocationInfo } from "@/actions/location-fn";
import env from "@/config/env";
import axios from "axios";

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
        avatar_url: values.avatar,
        primary_location: values.primaryArea,
        categories: values.topics,
        initial_setup: true,
      })
      .eq("id", user.id);
    if (error) throw error;
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

export const getCityName = async () => {
  try {
    const location = await getLocationInfo();

    if (location) {
      let cityInfo = location?.city?.name;

      console.log({ location }, "ssssss");
      return {
        city: cityInfo || null,
      };
    }
  } catch (error) {
    console.error("[GET_CITY_NAME]", error);
    throw error;
  }
};

export const getLocalCity = async () => {
  const location = await getLocationInfo();
  console.log({ location });
  if (location) {
    let cityInfo = location?.city?.name;
  }

  return location;
};
