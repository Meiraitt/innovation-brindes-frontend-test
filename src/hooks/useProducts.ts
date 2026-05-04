"use client";

import { useQuery } from "@tanstack/react-query";
import { listProducts, ProductRequestError } from "@/services/products";
import type { ProductFilters } from "@/types/product";

export const useProducts = (filters: ProductFilters) => {
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => listProducts(filters),
    retry: (failureCount, error) => {
      if (error instanceof ProductRequestError && error.status === 401) {
        return false;
      }

      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  return {
    products: query.data ?? [],
    productsError: query.error,
    isProductsError: query.isError,
    isProductsFetching: query.isFetching,
    isProductsLoading: query.isLoading,
    refetchProducts: query.refetch,
  };
};
