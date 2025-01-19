import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { setupSchema } from "../schema";
import { Session } from "@supabase/supabase-js";

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
