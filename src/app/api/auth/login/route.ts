import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/constants/auth";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

const API_URL = process.env.INNOVATION_API_URL;
const LOGIN_URL = `${API_URL}/login/acessar`;

const externalFields = {
  accessToken: "token_de_acesso",
  groupId: "codigo_grupo",
  groupName: "nome_grupo",
  password: "senha",
  user: "dados_usuario",
  userId: "codigo_usuario",
  userName: "nome_usuario",
} as const;

type ExternalLoginUser = {
  [externalFields.groupId]: string;
  [externalFields.groupName]: string;
  [externalFields.userId]: string;
  [externalFields.userName]: string;
};

type ExternalLoginResponse = {
  [externalFields.accessToken]?: string;
  [externalFields.user]?: ExternalLoginUser;
  message: string;
  status: number;
};

export async function POST(request: Request) {
  const credentials = (await request.json()) as LoginCredentials;

  if (!credentials.user || !credentials.password) {
    return NextResponse.json(
      {
        status: 0,
        message: "Informe usuario e senha para continuar.",
      },
      { status: 400 },
    );
  }

  try {
    const apiResponse = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.user,
        [externalFields.password]: credentials.password,
      }),
    });

    const data = (await apiResponse.json()) as ExternalLoginResponse;
    const accessToken = data[externalFields.accessToken];
    const externalUser = data[externalFields.user];

    if (!apiResponse.ok || data.status === 0 || !accessToken) {
      return NextResponse.json(
        {
          status: data.status ?? 0,
          message: data.message || "Usuario ou senha invalidos.",
        },
        { status: 401 },
      );
    }

    const loginResponse: LoginResponse = {
      message: data.message,
      status: data.status,
      user: externalUser
        ? {
            groupId: externalUser[externalFields.groupId],
            groupName: externalUser[externalFields.groupName],
            id: externalUser[externalFields.userId],
            name: externalUser[externalFields.userName],
          }
        : undefined,
    };

    const response = NextResponse.json(loginResponse);
    const maxAge = credentials.rememberMe ? 60 * 60 * 24 * 30 : undefined; // 30 days

    response.cookies.set(AUTH_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      maxAge,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        status: 0,
        message: "Nao foi possivel conectar ao servidor. Tente novamente.",
      },
      { status: 502 },
    );
  }
}
