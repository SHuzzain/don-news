import * as WebBrowser from "expo-web-browser";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/lib/supabase";
import { AuthError, User } from "@supabase/supabase-js";

// required for web only
const redirectTo = makeRedirectUri();

export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export const handleGoogleAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.error("Error during Google Auth:", error);
    return;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo,
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export const handleFaceBookAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.error("Error during Facebook Auth:", error);
    return;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo,
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export const fetchAuthUser = async (): Promise<{
  user: User | null;
  error: AuthError | null;
}> => {
  try {
    const response = await supabase.auth.getUser();
    return { user: response.data?.user || null, error: response.error || null };
  } catch (error) {
    console.error("SUPABASE_AUTH_ERROR", error);
    return { user: null, error: error as AuthError };
  }
};

export const logoutUser = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error("LOGOUT_ERROR", error);
    return { error: error as AuthError };
  }
};
