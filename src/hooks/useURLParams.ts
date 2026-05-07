import { useState, useEffect, useCallback } from "react";

type UrlParams = {
  title: string;
  price: number | "";
  priceMin: number | "";
  priceMax: number | "";
  categories: number[];
  sort: string;
};

export const useUrlParams = (): [
  UrlParams,
  (params: Partial<UrlParams>) => void
] => {
  const getParamsFromUrl = useCallback((): UrlParams => {
    const params = new URLSearchParams(window.location.search);
    return {
      title: params.get("title") || "",
      price: params.get("price") ? Number(params.get("price")) : "",
      priceMin: params.get("price_min") ? Number(params.get("price_min")) : "",
      priceMax: params.get("price_max") ? Number(params.get("price_max")) : "",
      categories: params.get("categories")
        ? params.get("categories")!.split(",").map(Number)
        : [],
      sort: params.get("sort") || "",
    };
  }, []);

  const [filters, setFilters] = useState<UrlParams>(getParamsFromUrl);

  const updateUrl = useCallback((newFilters: Partial<UrlParams>) => {
    const merged = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    if (merged.title) params.set("title", merged.title);
    if (merged.price !== "") params.set("price", String(merged.price));
    if (merged.priceMin !== "") params.set("price_min", String(merged.priceMin));
    if (merged.priceMax !== "") params.set("price_max", String(merged.priceMax));
    if (merged.categories.length)
      params.set("categories", merged.categories.join(","));
    if (merged.sort) params.set("sort", merged.sort);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  }, [filters]);

  useEffect(() => {
    updateUrl(filters);
  }, [filters, updateUrl]);

  useEffect(() => {
    const handlePopState = () => {
      setFilters(getParamsFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getParamsFromUrl]);

  const setPartialFilters = useCallback((newFilters: Partial<UrlParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return [filters, setPartialFilters];
};