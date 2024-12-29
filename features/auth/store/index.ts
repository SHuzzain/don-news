// store/auth/index.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, AuthError } from "@supabase/supabase-js";
import { fetchAuthUser, logoutUser } from "../actions";

interface ProfileStoreProps {
  profile: User | null;
  isLoading: boolean;
  isError: AuthError | null;
  fetchAuth: () => Promise<void>;
  setAuth: (data: User) => void;
  updateAuth: (data: Partial<User>) => void;
  logout: () => Promise<void>;
  removeAll: () => void;
}

const authStore = create(
  persist<ProfileStoreProps>(
    (set, get) => ({
      profile: null,
      isLoading: false,
      isError: null,

      /**
       * Fetch the authenticated user and update the store.
       */
      fetchAuth: async () => {
        set({ isLoading: true, isError: null });
        const { user, error } = await fetchAuthUser();
        if (error) {
          set({ isError: error });
        }
        if (user) {
          set({ profile: user });
        }
        set({ isLoading: false });
      },

      /**
       * Set the authenticated user manually.
       */
      setAuth: (data: User) => {
        set({ profile: data });
      },

      /**
       * Update the profile data with partial updates.
       */
      updateAuth: (data: Partial<User>) => {
        const currentValues = get().profile;
        if (currentValues) {
          set({ profile: { ...currentValues, ...data } });
        }
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
      removeAll: () => set({ profile: null }),
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default authStore;
