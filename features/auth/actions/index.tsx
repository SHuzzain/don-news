import * as WebBrowser from "expo-web-browser";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/lib/supabase";
import { AuthError, Session, VerifyOtpParams } from "@supabase/supabase-js";
import { z } from "zod";
import { signInSchema, signUpSchema } from "../schema";
import { Tables } from "@/types/supabase";

const redirectTo = makeRedirectUri();

/**
 * Extracts session information from the URL and sets the session in Supabase.
 */
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

/**
 * Handles authentication for a given provider.
 */
export const handleAuth = async (provider: "google" | "facebook") => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo,
    );

    if (res.type === "success" && res.url) {
      await createSessionFromUrl(res.url);
    }
  } catch (err) {
    console.error(`Error during ${provider} Auth:`, err);
  }
};

/**
 * Handle authentication sign in and sign up
 */

export const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
  const checkHasAccount = await supabase
    .from("profiles")
    .select("*")
    .eq("email", values.credential)
    .single();

  if (checkHasAccount.error) {
    console.error("[SIGNIN_CHECK_ERROR]", checkHasAccount.error);
    throw checkHasAccount.error;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: values.credential,
    password: values.password,
  });

  if (error) {
    console.error("[SIGNIN_ERROR]", error);
    throw error;
  }

  return true;
};

/**
 * Handle authentication sign in and sign up
 */

export const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
  const { terms, ...data } = values;

  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (response.error) {
    console.error("[SIGN_UP]", response.error);
    throw response.error;
  }

  return response;
};

/**
 * implement otp verification logic here
 */

export const handleOtp = async (data: VerifyOtpParams) => {
  const response = await supabase.auth.verifyOtp(data);
  if (response.error) {
    console.error("[OTP]", response.error);
    throw response.error;
  }

  return response.data;
};

/**
 * Retrieves the current session from Supabase.
 */
export const handleSession = async (): Promise<
  { session: Session | null } & { error: AuthError | null } & {
    profileData: Tables<"profiles"> | null;
  }
> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.session?.user.id as string);

    if (profileError) throw profileError;

    return {
      session: data.session,
      error: null,
      profileData: profileData[0],
    };
  } catch (err) {
    console.error("SUPABASE_AUTH_ERROR", err);
    return { session: null, error: err as AuthError, profileData: null };
  }
};

/**
 * Logs out the user.
 */
export const logoutUser = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error("LOGOUT_ERROR", err);
    return { error: err as AuthError };
  }
};
