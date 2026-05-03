"use client";

import { Button, Input, Skeleton } from "@/components";
import { ProductCard } from "./components/ProductCard";
import { useProductsView } from "./hooks/useProductsView";

const productSkeletons = Array.from({ length: 10 }, (_, index) => index);

export const Products = () => {
  const {
    canLoadMoreProducts,
    emptyProductsMessage,
    favoriteProductCodes,
    handleClearFilters,
    handleLoadMoreProducts,
    handleSearchChange,
    handleSortChange,
    handleToggleShowOnlyFavorites,
    hasProducts,
    hasVisibleProducts,
    isLoadingMoreProducts,
    isProductsError,
    isProductsFetching,
    isProductsLoading,
    productsError,
    refetchProducts,
    searchTerm,
    showOnlyFavorites,
    sortOption,
    toggleFavoriteProduct,
    visibleProducts,
  } = useProductsView();

  return (
    <main>
      <section className="mx-auto flex w-full max-w-360 flex-col gap-4 px-6 py-6">
        <div className="grid gap-4 md:grid-cols-[1fr_240px_auto] md:items-end">
          <div className="relative">
            <Input
              className="pr-12"
              label="Buscar produto"
              name="productSearch"
              onChange={handleSearchChange}
              placeholder="Buscar por nome ou codigo"
              value={searchTerm}
            />
            {searchTerm ? (
              <button
                aria-label="Limpar busca"
                className="absolute bottom-3 right-3 flex size-6 cursor-pointer items-center justify-center rounded-full text-lg font-bold leading-none text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76c900]"
                onClick={handleClearFilters}
                type="button"
              >
                ×
              </button>
            ) : null}
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
            Ordenar por
            <span className="relative">
              <select
                className="h-12 w-full appearance-none rounded-md border border-zinc-300 bg-white px-4 pr-14 text-base text-zinc-900 shadow-sm focus:border-[#76c900] focus:outline-none focus:ring-2 focus:ring-[#76c900]/30"
                onChange={handleSortChange}
                value={sortOption}
              >
                <option value="name-asc">Nome A-Z</option>
                <option value="name-desc">Nome Z-A</option>
                <option value="price-asc">Preco menor</option>
                <option value="price-desc">Preco maior</option>
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-zinc-900"
              />
            </span>
          </label>
          <Button
            aria-pressed={showOnlyFavorites}
            className={`h-12 px-5 ${
              showOnlyFavorites
                ? "bg-[#76c900] text-white hover:bg-[#68b500]"
                : "bg-white text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-50"
            }`}
            onClick={handleToggleShowOnlyFavorites}
            type="button"
          >
            Favoritos
          </Button>
        </div>

        {isProductsFetching && !isProductsLoading ? (
          <p className="text-sm font-semibold text-zinc-500">
            Atualizando produtos...
          </p>
        ) : null}
      </section>

      {isProductsError ? (
        <section className="mx-auto flex w-full max-w-360 flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-700">
            {productsError instanceof Error
              ? productsError.message
              : "Nao foi possivel carregar os produtos."}
          </p>
          <Button onClick={() => refetchProducts()} type="button">
            Tentar novamente
          </Button>
        </section>
      ) : null}

      {isProductsLoading ? (
        <section className="mx-auto grid w-full max-w-360 grid-cols-1 justify-items-center gap-x-12 gap-y-12 px-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productSkeletons.map((skeleton) => (
            <div className="w-full max-w-56" key={skeleton}>
              <Skeleton className="mb-3 h-10 w-full" />
              <Skeleton className="h-125 w-full" />
              <Skeleton className="mt-3 h-8 w-full rounded-none" />
            </div>
          ))}
        </section>
      ) : null}

      {!isProductsLoading && !isProductsError && !hasProducts ? (
        <section className="mx-auto flex w-full max-w-360 flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-700">
            {emptyProductsMessage}
          </p>
        </section>
      ) : null}

      {!isProductsLoading && !isProductsError && hasVisibleProducts ? (
        <section className="mx-auto flex w-full max-w-360 flex-col items-center gap-8 px-6 py-8">
          <div className="grid w-full grid-cols-1 justify-items-center gap-x-12 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleProducts.map((product, index) => (
              <ProductCard
                isPriorityImage={index < 5}
                isFavorite={favoriteProductCodes.includes(product.code)}
                key={`${product.code}-${product.reference}`}
                onToggleFavorite={toggleFavoriteProduct}
                product={product}
              />
            ))}
          </div>

          {canLoadMoreProducts ? (
            <Button
              isLoading={isLoadingMoreProducts}
              onClick={handleLoadMoreProducts}
              type="button"
            >
              Carregar mais
            </Button>
          ) : null}
        </section>
      ) : null}
    </main>
  );
};
