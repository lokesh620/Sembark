import type { Category } from "../types/category";
import type { Product } from "../types/product";

export const getProducts = async (params: {
  offset?: number;
  limit?: number;
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
}) => {
  const query = new URLSearchParams();

  // Only add parameters that are defined and not empty/undefined
  if (params.offset !== undefined && params.offset !== null) {
    query.append("offset", String(params.offset));
  }

  if (params.limit !== undefined && params.limit !== null) {
    query.append("limit", String(params.limit));
  }

  if (params.title && params.title.trim() !== "") {
    query.append("title", params.title);
  }

  if (params.price && params.price !== undefined && params.price !== null ) {
    query.append("price", String(params.price));
  }

  if (params.price_min && params.price_min !== undefined && params.price_min !== null) {
    query.append("price_min", String(params.price_min));
  }

  if (params.price_max && params.price_max !== undefined && params.price_max !== null) {
    query.append("price_max", String(params.price_max));
  }

  if (params.categoryId !== undefined && params.categoryId !== null) {
    query.append("categoryId", String(params.categoryId));
  }

  const url = `https://api.escuelajs.co/api/v1/products?${query.toString()}`;
  console.log("Fetching URL:", url); // For debugging

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};