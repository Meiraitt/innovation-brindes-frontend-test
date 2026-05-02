"use client";

import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
    },
  });

  return {
    isLoggingOut: mutation.isPending,
    logoutError: mutation.error,
    logoutUser: mutation.mutate,
    logoutUserAsync: mutation.mutateAsync,
  };
};
