import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.png";
import { BoxIcon } from "@/assets/icons";
import { Button } from "@/components";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

type ProductCardProps = {
  isPriorityImage?: boolean;
  product: Product;
};

const colorSwatchesClassNames = [
  "bg-[#8c2f25]",
  "bg-[#2468a2]",
  "bg-[#2d4d73]",
  "bg-[#6aa9c8]",
  "bg-[#76c900]",
  "bg-[#343434]",
  "bg-[#f1f1f1]",
  "bg-[#be3c20]",
  "bg-[#52c7a7]",
  "bg-[#22d36c]",
  "bg-[#4aa7ca]",
  "bg-[#f36c21]",
  "bg-[#ffbc00]",
  "bg-[#2d1b47]",
];

export const ProductCard = ({
  isPriorityImage = false,
  product,
}: ProductCardProps) => {
  const productPrice = Number(product.price);
  const hasPrice = Number.isFinite(productPrice) && productPrice > 0;

  return (
    <article className="flex w-full max-w-56 flex-col items-center">
      <header className="mb-3 flex min-h-14 flex-col items-center justify-end text-center leading-tight">
        <h2 className="line-clamp-2 text-xl font-extrabold text-zinc-950">
          {product.name}
        </h2>
        <p className="text-base font-medium tracking-[0.12em] text-zinc-900">
          {product.code}
        </p>
      </header>

      <div className="relative w-full border border-zinc-200 bg-white">
        <span className="absolute right-0 top-0 z-10 bg-zinc-50 px-1.5 py-0.5 text-sm font-extrabold text-cyan-500">
          EXCLUSIVO!
        </span>

        <div className="relative aspect-[0.88] w-full overflow-hidden">
          <Image
            alt={product.name}
            className="h-full w-full object-contain p-2"
            fetchPriority={isPriorityImage ? "high" : "auto"}
            height={420}
            loading={isPriorityImage ? "eager" : "lazy"}
            quality={95}
            sizes="224px"
            src={product.imageUrl || placeholderImage}
            width={420}
          />
        </div>

        <div className="relative h-15">
          <div className="absolute -left-px top-0 flex h-13 w-[78%] items-center justify-end rounded-tr-md border border-zinc-200 bg-white pr-3">
            <p className="text-xs font-extrabold leading-tight text-zinc-600">
              com embalagem
              <br />
              especial
            </p>
          </div>
          <div className="absolute left-1 bottom-2.5 z-10">
            <BoxIcon />
          </div>
        </div>

        <div className="space-y-4 px-3 py-3">
          <p className="line-clamp-2 min-h-10 text-[.75rem] leading-5 text-zinc-600">
            {product.description}
          </p>

          <div>
            <p className="mb-2 text-sm font-bold text-zinc-600">Cores:</p>
            <div className="flex w-full flex-wrap gap-1.5 sm:hidden">
              {colorSwatchesClassNames.map((colorClassName) => (
                <button
                  aria-label="Selecionar cor do produto"
                  className={`size-3.5 cursor-pointer rounded-full ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76c900] ${colorClassName}`}
                  key={colorClassName}
                  type="button"
                />
              ))}
            </div>
            <div className="hidden sm:block">
              <div className="mb-1.5 flex gap-1.5">
                {colorSwatchesClassNames.slice(0, 6).map((colorClassName) => (
                  <button
                    aria-label="Selecionar cor do produto"
                    className={`size-3.5 cursor-pointer rounded-full ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76c900] ${colorClassName}`}
                    key={colorClassName}
                    type="button"
                  />
                ))}
              </div>
              <div className="grid w-19.5 grid-cols-4 gap-1.5">
                {colorSwatchesClassNames.slice(6).map((colorClassName) => (
                  <button
                    aria-label="Selecionar cor do produto"
                    className={`size-3.5 cursor-pointer rounded-full ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#76c900] ${colorClassName}`}
                    key={colorClassName}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-left leading-none">
            <div className="text-left">
              {hasPrice ? (
                <>
                  <p className="translate-x-px text-sm leading-none text-zinc-600">
                    a partir de
                  </p>
                  <p className="text-2xl font-extrabold leading-none text-zinc-700">
                    {formatCurrency(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-xl font-extrabold leading-none text-zinc-700">
                  Sob consulta
                </p>
              )}
            </div>
            <p className="text-xs font-bold text-zinc-600">
              {hasPrice ? "gerado pela melhor oferta" : "preco indisponivel"}
            </p>
          </div>
        </div>
      </div>

      <Button
        className="mt-3 h-8 w-full rounded-none px-4 text-base font-bold"
        size="sm"
      >
        CONFIRA
      </Button>
    </article>
  );
};
