import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export async function uploadFile(uri: string, userId: string, path: string) {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    const filePath = `${userId}/${path}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, decode(base64), { contentType });
    if (error) {
      console.error("POST_UPLOAD_FILE", error);
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("[UPLOAD_FILE]", error);
  }
}
