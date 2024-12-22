import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/lib/supabase";

export const handleGoogleAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/drive.readonly",
    },
  });

  if (error) {
    console.error("Error during Google Auth:", error);
    return;
  }

  // Open the URL in the browser
  const result = await WebBrowser.openBrowserAsync(data.url);

  console.log("Browser result:", result);
};

export const handleFaceBookAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });

  if (error) {
    console.error("Error during Facebook Auth:", error);
    return;
  }

  // Open the URL in the browser
  const result = await WebBrowser.openBrowserAsync(data.url);

  console.log("Browser result:", result);
};
