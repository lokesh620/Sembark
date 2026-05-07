export type Product = {
  id: number;
  title: string;
  price: number;
  images: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
};
