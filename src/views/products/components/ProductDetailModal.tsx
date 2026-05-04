"use client";

import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.png";
import { HeartIcon } from "@/assets/icons";
import { Button, Modal } from "@/components";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

type ProductDetailModalProps = {
  isFavorite: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onToggleFavorite: (productCode: string) => void;
  product: Product | null;
};

export const ProductDetailModal = ({
  isFavorite,
  isOpen,
  onOpenChange,
  onToggleFavorite,
  product,
}: ProductDetailModalProps) => {
  if (!product) {
    return null;
  }

  const productPrice = Number(product.price);
  const hasPrice = Number.isFinite(productPrice) && productPrice > 0;

  return (
    <Modal
      description={`Codigo ${product.code}`}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={product.name}
    >
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-200 bg-white">
          <button
            aria-label={
              isFavorite
                ? `Remover ${product.name} dos favoritos`
                : `Adicionar ${product.name} aos favoritos`
            }
            aria-pressed={isFavorite}
            className={`absolute left-3 top-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76c900] ${
              isFavorite ? "text-[#76c900]" : "text-zinc-400"
            }`}
            onClick={() => onToggleFavorite(product.code)}
            type="button"
          >
            <HeartIcon className="size-5" isFilled={isFavorite} />
          </button>
          <Image
            alt={product.name}
            className="object-contain p-4"
            fill
            sizes="240px"
            src={product.imageUrl || placeholderImage}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-bold uppercase text-zinc-500">
              Descricao
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              {product.description || "Descricao nao informada."}
            </p>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-bold text-zinc-500">Codigo</dt>
              <dd className="mt-1 text-zinc-900">{product.code}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-500">Referencia</dt>
              <dd className="mt-1 text-zinc-900">{product.reference}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-500">Categoria</dt>
              <dd className="mt-1 text-zinc-900">{product.categoryCode}</dd>
            </div>
            <div>
              <dt className="font-bold text-zinc-500">Preco</dt>
              <dd className="mt-1 text-zinc-900">
                {hasPrice ? formatCurrency(product.price) : "Sob consulta"}
              </dd>
            </div>
          </dl>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)} type="button">
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
