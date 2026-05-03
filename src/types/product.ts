export type Product = {
  categoryCode: string;
  code: string;
  description: string;
  imageUrl: string;
  name: string;
  price: string;
  reference: string;
};

export type ProductFilters = {
  code: string;
  name: string;
};
