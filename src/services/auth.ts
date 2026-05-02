import type { LoginCredentials, LoginResponse } from "@/types/auth";

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = (await response.json()) as LoginResponse;

  if (!response.ok || data.status === 0) {
    throw new Error(data.message || "Nao foi possivel fazer login.");
  }

  return data;
};

export const logout = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
};
