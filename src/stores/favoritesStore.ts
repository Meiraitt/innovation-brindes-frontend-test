"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoritesStore = {
  favoriteProductCodes: string[];
  toggleFavoriteProduct: (productCode: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favoriteProductCodes: [],
      toggleFavoriteProduct: (productCode) =>
        set((state) => {
          const isFavorite = state.favoriteProductCodes.includes(productCode);

          return {
            favoriteProductCodes: isFavorite
              ? state.favoriteProductCodes.filter(
                  (favoriteProductCode) => favoriteProductCode !== productCode,
                )
              : [...state.favoriteProductCodes, productCode],
          };
        }),
    }),
    {
      name: "innovation-favorite-products",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
