import type { Product, ProductFilters } from "@/types/product";

export class ProductRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ProductRequestError";
    this.status = status;
  }
}

const hasProductFilters = (filters: ProductFilters) => {
  return Boolean(filters.name.trim() || filters.code.trim());
};

export const listProducts = async (filters: ProductFilters) => {
  const shouldFilterProducts = hasProductFilters(filters);
  const response = await fetch("/api/products", {
    method: shouldFilterProducts ? "POST" : "GET",
    ...(shouldFilterProducts
      ? {
          body: JSON.stringify(filters),
          headers: {
            "Content-Type": "application/json",
          },
        }
      : {}),
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
