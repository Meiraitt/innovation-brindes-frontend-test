import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/constants/auth";

export const POST = () => {
  const response = NextResponse.json({
    message: "Logout realizado com sucesso.",
    status: 1,
  });

  response.cookies.delete(AUTH_TOKEN_COOKIE);

  return response;
};
