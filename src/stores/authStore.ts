"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";

type AuthStore = {
  clearUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setUser: (user: AuthUser) => void;
  user: AuthUser | null;
  userName: string | null;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      clearUser: () => set({ user: null, userName: null }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setUser: (user) => set({ user, userName: user.name }),
      user: null,
      userName: null,
    }),
    {
      name: "innovation-auth-session",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        userName: state.userName,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
