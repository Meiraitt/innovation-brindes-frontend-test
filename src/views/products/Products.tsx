"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@/components";
import { useLogout } from "@/hooks/useLogout";
import { useProducts } from "@/hooks/useProducts";
import { ProductRequestError } from "@/services/products";
import { ProductCard } from "./components/ProductCard";
import { ProductsHeader } from "./components/ProductsHeader";

const productSkeletons = Array.from({ length: 10 }, (_, index) => index);

export const Products = () => {
  const router = useRouter();
  const { logoutUser } = useLogout();
  const {
    isProductsError,
    isProductsLoading,
    products,
    productsError,
    refetchProducts,
  } = useProducts();
  const hasProducts = products.length > 0;

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

  return (
    <main className="min-h-screen bg-white pt-10">
      <ProductsHeader />

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
            Nenhum produto encontrado.
          </p>
        </section>
      ) : null}

      {!isProductsLoading && !isProductsError && hasProducts ? (
        <section className="mx-auto grid w-full max-w-360 grid-cols-1 justify-items-center gap-x-12 gap-y-12 px-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product, index) => (
            <ProductCard
              isPriorityImage={index < 5}
              key={`${product.code}-${product.reference}`}
              product={product}
            />
          ))}
        </section>
      ) : null}
    </main>
  );
};
