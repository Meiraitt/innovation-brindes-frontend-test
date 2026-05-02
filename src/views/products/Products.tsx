import { ProductCardPreview } from "./components/ProductCardPreview";
import { ProductsHeader } from "./components/ProductsHeader";

const previewProducts = Array.from({ length: 10 }, (_, index) => ({
  code: "7563",
  description:
    "Caneta plastica com funcoes esferografica e marca texto, com...",
  imageUrl:
    "https://innovationbrindes.com.br/images/produtos/3419/copo-plastico-ml-brindes-personalizados-1-1.jpg",
  name: "Lanterna",
  price: 2.44,
  id: index,
}));

export const Products = () => {
  return (
    <main className="min-h-screen bg-white pt-10">
      <ProductsHeader />

      <section className="mx-auto grid w-full max-w-360 grid-cols-1 justify-items-center gap-x-12 gap-y-12 px-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {previewProducts.map((product) => (
          <ProductCardPreview key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};
