import { type Product } from "../types/product";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="card h-100 shadow-sm">
      <img src={product.images} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;