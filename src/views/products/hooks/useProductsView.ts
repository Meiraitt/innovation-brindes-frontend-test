"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useLogout } from "@/hooks/useLogout";
import { useProducts } from "@/hooks/useProducts";
import { ProductRequestError } from "@/services/products";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { Product, ProductFilters } from "@/types/product";
import { type ProductSortOption, sortProducts } from "../utils/sortProducts";

const productsPerPage = 10;

const getProductFilters = (searchTerm: string): ProductFilters => {
  const trimmedSearchTerm = searchTerm.trim();
  const isCodeSearch = /^\d+$/.test(trimmedSearchTerm);

  return {
    code: isCodeSearch ? trimmedSearchTerm : "",
    name: isCodeSearch ? "" : trimmedSearchTerm,
  };
};

export const useProductsView = () => {
  const router = useRouter();
  const { logoutUser } = useLogout();
  const loadMoreTimeout = useRef<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<ProductSortOption>("name-asc");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleProductsCount, setVisibleProductsCount] =
    useState(productsPerPage);
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);
  const favoriteProductCodes = useFavoritesStore(
    (state) => state.favoriteProductCodes,
  );
  const toggleFavoriteProduct = useFavoritesStore(
    (state) => state.toggleFavoriteProduct,
  );
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400);
  const debouncedFilters = useMemo(
    () => getProductFilters(debouncedSearchTerm),
    [debouncedSearchTerm],
  );
  const {
    isProductsError,
    isProductsFetching,
    isProductsLoading,
    products,
    productsError,
    refetchProducts,
  } = useProducts(debouncedFilters);
  const filteredProducts = useMemo(() => {
    if (!showOnlyFavorites) {
      return products;
    }

    return products.filter((product) =>
      favoriteProductCodes.includes(product.code),
    );
  }, [favoriteProductCodes, products, showOnlyFavorites]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortOption),
    [filteredProducts, sortOption],
  );
  const visibleProducts = sortedProducts.slice(0, visibleProductsCount);
  const hasProducts = sortedProducts.length > 0;
  const hasVisibleProducts = visibleProducts.length > 0;
  const canLoadMoreProducts = visibleProductsCount < sortedProducts.length;
  const hasActiveFilters = Boolean(
    debouncedFilters.name.trim() || debouncedFilters.code.trim(),
  );
  const emptyProductsMessage = (() => {
    if (showOnlyFavorites) {
      return "Nenhum favorito encontrado.";
    }

    if (hasActiveFilters) {
      return "Nenhum produto encontrado para a busca.";
    }

    return "Nenhum produto encontrado.";
  })();

  useEffect(() => {
    if (
      productsError instanceof ProductRequestError &&
      productsError.status === 401
    ) {
      logoutUser(undefined, {
        onSettled: () => {
          router.replace("/login");
        },
      });
    }
  }, [logoutUser, productsError, router]);

  const clearLoadMoreTimeout = () => {
    if (loadMoreTimeout.current) {
      window.clearTimeout(loadMoreTimeout.current);
      loadMoreTimeout.current = null;
    }
  };

  const resetVisibleProducts = () => {
    clearLoadMoreTimeout();
    setVisibleProductsCount(productsPerPage);
    setIsLoadingMoreProducts(false);
  };

  useEffect(() => {
    return () => {
      clearLoadMoreTimeout();
    };
  }, []);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
    resetVisibleProducts();
  };

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSortOption(event.target.value as ProductSortOption);
    resetVisibleProducts();
  };

  const handleToggleShowOnlyFavorites = () => {
    setShowOnlyFavorites((currentShowOnlyFavorites) => {
      return !currentShowOnlyFavorites;
    });
    resetVisibleProducts();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortOption("name-asc");
    setShowOnlyFavorites(false);
    resetVisibleProducts();
  };

  const handleLoadMoreProducts = () => {
    clearLoadMoreTimeout();
    setIsLoadingMoreProducts(true);
    loadMoreTimeout.current = window.setTimeout(() => {
      setVisibleProductsCount((currentCount) => currentCount + productsPerPage);
      setIsLoadingMoreProducts(false);
      loadMoreTimeout.current = null;
    }, 300);
  };

  const handleOpenProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleProductDetailsOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedProduct(null);
    }
  };

  return {
    canLoadMoreProducts,
    emptyProductsMessage,
    favoriteProductCodes,
    handleClearFilters,
    handleLoadMoreProducts,
    handleOpenProductDetails,
    handleProductDetailsOpenChange,
    handleSearchChange,
    handleSortChange,
    handleToggleShowOnlyFavorites,
    hasActiveFilters,
    hasProducts,
    hasVisibleProducts,
    isLoadingMoreProducts,
    isProductsError,
    isProductsFetching,
    isProductsLoading,
    productsError,
    refetchProducts,
    searchTerm,
    selectedProduct,
    shouldShowProductDetails: Boolean(selectedProduct),
    showOnlyFavorites,
    sortOption,
    toggleFavoriteProduct,
    visibleProducts,
  };
};
