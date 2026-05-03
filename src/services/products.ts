import type { Product } from "@/types/product";

export class ProductRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ProductRequestError";
    this.status = status;
  }
}

export const listProducts = async () => {
  const response = await fetch("/api/products", {
    method: "GET",
  });

  if (response.status === 401) {
    throw new ProductRequestError(
      "Sessao expirada. Faca login novamente.",
      response.status,
    );
  }

  if (!response.ok) {
    throw new ProductRequestError(
      "Nao foi possivel carregar os produtos.",
      response.status,
    );
  }

  return (await response.json()) as Product[];
};
