import { useEffect } from "react";
import useAuthStore from "@/features/auth/store";
import { supabase } from "@/lib/supabase";
import { Spinner } from "../ui/loading";
import { Redirect } from "expo-router";
import { toast } from "@/hooks/use-toast";

export default function AuthProvider() {
  const { fetchSession, session, isLoading, authUser, error } = useAuthStore();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event) => {
      fetchSession();
    });
  }, [fetchSession]);

  useEffect(() => {
    console.log(error?.message);
    if (error?.message) {
      toast({
        variant: "destructive",
        description: error?.message,
      });
    }
  }, [error?.message]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!session) {
    return <Redirect href={"/onboarding"} />;
  }
  if (session && !authUser?.initial_setup) {
    return <Redirect href={"/account-setup"} />;
  }

  return <Redirect href={"/with-auth/home"} />;
}
