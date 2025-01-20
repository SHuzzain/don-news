import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { setupSchema } from "../schema";
import { Session } from "@supabase/supabase-js";
import { getLocationInfo } from "@/actions/location-fn";
import env from "@/config/env";

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
    console.log("ACCOUNT_SETUP", error);
    return false;
  }
};

export const getCategories = async () => {
  try {
    let { data, error } = await supabase.from("categories").select("*");

    console.log({ data });

    if (error || !data) throw error;

    return data;
  } catch (error) {
    console.log("[GET_CATEGORIES]", error);
    return [];
  }
};

export const getCityName = async () => {
  try {
    const data = await getLocationInfo();

    const district = data.results[0].address_components.find((component) =>
      component.types.includes("administrative_area_level_2"),
    );

    const subAdmin = data.results[0].address_components.find((component) =>
      component.types.includes("administrative_area_level_3"),
    );
    let cityInfo = district ?? subAdmin;
    return { city: cityInfo?.long_name ?? cityInfo?.short_name ?? null };
  } catch (error) {
    console.log("[GET_CITY_NAME]", error);
    throw error;
  }
};

export const getLocalCity = async () => {
  const boundingBox = [9.0874559, 78.2149108, 9.947231, 79.4611126]; // Ramanathapuram boundary
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
  (
    node["place"="city"](${boundingBox.join(",")});
    node["place"="town"](${boundingBox.join(",")});
    node["place"="village"](${boundingBox.join(",")});
  );
  out body;`;

  const response = await fetch(overpassUrl);
  const data = await response.json();

  const cities = data.elements.map((place) => place?.tags);
  console.log({ cities });
  return location;
};
