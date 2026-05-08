type Props = {
  categories: any[];

  selectedCategories: number[];
  setSelectedCategories: (val: number[]) => void;

  sort: string;
  setSort: (val: string) => void;

  title: string;
  setTitle: (val: string) => void;

  price: number | "";
  setPrice: (val: number | "") => void;

  priceMin: number | "";
  setPriceMin: (val: number | "") => void;

  priceMax: number | "";
  setPriceMax: (val: number | "") => void;
};

const FilterPanel = ({
  categories,
  selectedCategories,
  setSelectedCategories,

  sort,
  setSort,

  title,
  setTitle,
  price,
  setPrice,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}: Props) => {
  const toggleCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const topCategories = categories.slice(1, 5);

  return (
    <form
      role="search"
      aria-label="Product filters"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mb-3">
        <label htmlFor="filter-title" className="form-label fw-bold">
          Search
        </label>
        <input
          id="filter-title"
          type="search"
          className="form-control"
          placeholder="Search title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="filter-price" className="form-label fw-bold">
          Price
        </label>
        <input
          id="filter-price"
          className="form-control mb-2"
          type="number"
          placeholder="Exact price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : "")
          }
        />

        <div className="d-flex gap-2">
          <label htmlFor="filter-price-min" className="visually-hidden">
            Minimum price
          </label>
          <input
            id="filter-price-min"
            className="form-control"
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) =>
              setPriceMin(e.target.value ? Number(e.target.value) : "")
            }
          />

          <label htmlFor="filter-price-max" className="visually-hidden">
            Maximum price
          </label>
          <input
            id="filter-price-max"
            className="form-control"
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) =>
              setPriceMax(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
      </div>

      <fieldset className="mb-3">
        <legend className="fs-5 fw-bold">Categories</legend>
        {topCategories.map((cat) => {
          const inputId = `filter-cat-${cat.id}`;
          return (
            <div key={cat.id} className="form-check">
              <input
                id={inputId}
                type="checkbox"
                className="form-check-input"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
              />
              <label htmlFor={inputId} className="form-check-label">
                {cat.name}
              </label>
            </div>
          );
        })}
      </fieldset>

      <div>
        <label htmlFor="filter-sort" className="form-label fw-bold">
          Sort
        </label>
        <select
          id="filter-sort"
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">None</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>
    </form>
  );
};

export default FilterPanel;
