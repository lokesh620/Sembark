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
    <div>

      <h5>Search</h5>
      <input
        className="form-control mb-2"
        placeholder="Search title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <h5>Price</h5>
      <input
        className="form-control mb-2"
        type="number"
        placeholder="Exact price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value ? Number(e.target.value) : "")
        }
      />

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Min"
          value={priceMin}
          onChange={(e) =>
            setPriceMin(e.target.value ? Number(e.target.value) : "")
          }
        />

        <input
          className="form-control"
          type="number"
          placeholder="Max"
          value={priceMax}
          onChange={(e) =>
            setPriceMax(e.target.value ? Number(e.target.value) : "")
          }
        />
      </div>

      <h5>Categories</h5>
      {topCategories.map((cat) => (
        <div key={cat.id} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => toggleCategory(cat.id)}
          />
          <label className="form-check-label">{cat.name}</label>
        </div>
      ))}

      <h5 className="mt-3">Sort</h5>
      <select
        className="form-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">None</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

    </div>
  );
};

export default FilterPanel;