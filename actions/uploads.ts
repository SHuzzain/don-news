import { supabase } from "@/lib/supabase";

export async function uploadFile(file: File) {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload("profile", file);
  if (error) {
    console.log("POST_UPLOAD_FILE", error);
    throw error;
  } else {
    return data;
  }
}
