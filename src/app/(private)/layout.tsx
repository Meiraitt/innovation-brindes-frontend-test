import { ProductsHeader } from "@/views/products/components/ProductsHeader";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white pt-10">
      <ProductsHeader />
      {children}
    </div>
  );
}
