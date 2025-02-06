import { useEffect } from "react";
import useAuthStore from "@/features/auth/store";
import { supabase } from "@/lib/supabase";

export default function useSession() {
  const { fetchSession, setSession, session, isLoading, error, authUser } =
    useAuthStore();

  useEffect(() => {
    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ session: session });
    });
  }, [fetchSession, setSession, error]);

  return { session, isLoading, authUser };
}
