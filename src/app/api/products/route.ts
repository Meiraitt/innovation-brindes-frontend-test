import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/constants/auth";
import type { Product } from "@/types/product";

const API_URL = process.env.INNOVATION_API_URL;
const PRODUCTS_URL = `${API_URL}/produtos/listar`;

const externalFields = {
  categoryCode: "codigo_categoria",
  code: "codigo",
  description: "descricao",
  imageUrl: "imagem",
  name: "nome",
  price: "preco",
  reference: "referencia",
} as const;

type ExternalProduct = {
  [externalFields.categoryCode]: string;
  [externalFields.code]: string;
  [externalFields.description]: string;
  [externalFields.imageUrl]: string;
  [externalFields.name]: string;
  [externalFields.price]: string;
  [externalFields.reference]: string;
};

const normalizeProduct = (product: ExternalProduct): Product => ({
  categoryCode: product[externalFields.categoryCode],
  code: product[externalFields.code],
  description: product[externalFields.description],
  imageUrl: product[externalFields.imageUrl],
  name: product[externalFields.name],
  price: product[externalFields.price],
  reference: product[externalFields.reference],
});

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Sessao expirada. Faca login novamente." },
      { status: 401 },
    );
  }

  try {
    const apiResponse = await fetch(PRODUCTS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (apiResponse.status === 401) {
      return NextResponse.json(
        { message: "Sessao expirada. Faca login novamente." },
        { status: 401 },
      );
    }

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: "Nao foi possivel carregar os produtos." },
        { status: apiResponse.status },
      );
    }

    const products = (await apiResponse.json()) as ExternalProduct[];

    return NextResponse.json(products.map(normalizeProduct));
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel conectar ao servidor de produtos." },
      { status: 502 },
    );
  }
};
