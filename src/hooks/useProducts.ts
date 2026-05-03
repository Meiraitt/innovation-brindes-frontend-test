"use client";

import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/services/products";

export const useProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  return {
    products: query.data ?? [],
    productsError: query.error,
    isProductsError: query.isError,
    isProductsLoading: query.isLoading,
    refetchProducts: query.refetch,
  };
};
