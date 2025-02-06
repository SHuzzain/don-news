// store/auth/index.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthError } from "@supabase/supabase-js";
import { handleSession, logoutUser } from "../actions";
import { AuthSessionProps } from "../types";

interface SessionStoreProps extends AuthSessionProps {
  isLoading: boolean;
  error: AuthError | null;
  fetchSession: () => Promise<void>;
  setSession: (data: AuthSessionProps) => void;
  authUser: object;
  logout: () => Promise<void>;
  removeAll: () => void;
}

const useAuthStore = create(
  persist<SessionStoreProps>(
    (set, get) => ({
      session: null,
      isLoading: true,
      error: null,
      authUser: {},

      /**
       * Fetch the authenticated user and update the store.
       */
      fetchSession: async () => {
        const { session, error, profileData } = await handleSession();
        set({ isLoading: false, error, session, authUser: profileData || {} });
      },

      /**
       * Set the authenticated user manually.
       */
      setSession: (data) => {
        set(data);
      },

      /**
       * Log out the user and clear the store.
       */
      logout: async () => {
        const { error } = await logoutUser();
        if (error) {
          console.error("LOGOUT_ERROR", error);
        } else {
          get().removeAll();
        }
      },

      /**
       * Clear all profile data from the store.
       */
      removeAll: () => set({ session: null, error: null, isLoading: false }),
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
