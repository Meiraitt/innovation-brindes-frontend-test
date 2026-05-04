import type { Product } from "@/types/product";

export type ProductSortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export const sortProducts = (
  products: Product[],
  sortOption: ProductSortOption,
) => {
  const sortedProducts = [...products];

  return sortedProducts.sort((firstProduct, secondProduct) => {
    if (sortOption === "name-asc") {
      return firstProduct.name.localeCompare(secondProduct.name, "pt-BR");
    }

    if (sortOption === "name-desc") {
      return secondProduct.name.localeCompare(firstProduct.name, "pt-BR");
    }

    const firstPrice = Number(firstProduct.price);
    const secondPrice = Number(secondProduct.price);
    const firstHasPrice = Number.isFinite(firstPrice) && firstPrice > 0;
    const secondHasPrice = Number.isFinite(secondPrice) && secondPrice > 0;

    if (!firstHasPrice && !secondHasPrice) {
      return 0;
    }

    if (!firstHasPrice) {
      return 1;
    }

    if (!secondHasPrice) {
      return -1;
    }

    if (sortOption === "price-asc") {
      return firstPrice - secondPrice;
    }

    return secondPrice - firstPrice;
  });
};
