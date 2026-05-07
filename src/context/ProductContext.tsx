import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import { type Product } from "../types/product";
import type { Category } from "../types/category";

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;

  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;


  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;

  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductContext  = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        offset,
        setOffset,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        categories,
        setCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

