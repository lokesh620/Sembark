import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProductsContext = () => {
  const context = useContext(ProductContext);  

  if (!context) {
    throw new Error(
      "useProductsContext must be used inside ProductProvider"
    );
  }

  return context;
};