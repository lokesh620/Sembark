import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/Filters";
import { type Product } from "../types/product";
import { getProducts, getCategories } from "../services/productService";
import { type Category } from "../types/category";
import { useUrlParams } from "../hooks/useURLParams";

const LIMIT = 20;

const Home = () => {
  const [urlFilters, setUrlFilters] = useUrlParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  //state for filter
  const [title, setTitle] = useState(urlFilters.title);
  const [price, setPrice] = useState<number | "">(urlFilters.price);
  const [priceMin, setPriceMin] = useState<number | "">(urlFilters.priceMin);
  const [priceMax, setPriceMax] = useState<number | "">(urlFilters.priceMax);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(urlFilters.categories);
  const [sort, setSort] = useState(urlFilters.sort);

  useEffect(() => {
    setUrlFilters({
      title,
      price,
      priceMin,
      priceMax,
      categories: selectedCategories,
      sort,
    });
  }, [title, price, priceMin, priceMax, selectedCategories, sort, setUrlFilters]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const applyFilters = (data: Product[]) => {
    return data.filter((p) => {
      const matchTitle =
        !title || p.title.toLowerCase().includes(title.toLowerCase());
      const matchPrice = price === "" || p.price === price;
      const matchRange =
        (priceMin === "" || p.price >= priceMin) &&
        (priceMax === "" || p.price <= priceMax);
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category.id);
      return matchTitle && matchPrice && matchRange && matchCategory;
    });
  };

  const fetchProducts = async (newOffset = 0, reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    const data = await getProducts({
      offset: newOffset,
      limit: LIMIT,
      title: title || undefined,
      price: price === "" ? undefined : Number(price),
      price_min: priceMin === "" ? undefined : Number(priceMin),
      price_max: priceMax === "" ? undefined : Number(priceMax),
    });

    if (data.length < LIMIT) setHasMore(false);
    setProducts((prev) => (reset ? data : [...prev, ...data]));
    setOffset(newOffset + LIMIT);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([]);
      setOffset(0);
      setHasMore(true);
      fetchProducts(0, true);
    }, 500);
    return () => clearTimeout(timer);
  }, [title, price, priceMin, priceMax, selectedCategories]);

useEffect(() => {
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;

    if (bottom && !loading && hasMore) {
      fetchProducts(offset);
      setOffset((prev) => prev + LIMIT);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [offset, loading, hasMore, title, price, priceMin]);
  // }, [offset, loading, hasMore, title, price, priceMin, priceMax]);

  const filteredAndSorted = applyFilters(products).sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <FilterPanel
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            sort={sort}
            setSort={setSort}
            title={title}
            setTitle={setTitle}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            price={price}
            setPrice={setPrice}
          />
        </div>

        <div className="col-md-9">
          <div className="row">
            {loading && products.length === 0 ? (
              <div className="text-center w-100 mt-5">
                <div className="spinner-border text-primary" />
                <p>Loading products...</p>
              </div>
            ) : (
              filteredAndSorted.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          {loading && products.length > 0 && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" />
            </div>
          )}
          {!hasMore && <p className="text-center text-muted">No more products</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;