"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import type { LoginCredentials } from "@/types/auth";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  });

  return {
    loginError: mutation.error,
    loginUser: mutation.mutate,
    loginUserAsync: mutation.mutateAsync,
    isLoginError: mutation.isError,
    isLoggingIn: mutation.isPending,
    resetLogin: mutation.reset,
  };
};
