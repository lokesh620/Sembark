import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  return (
    <div className="card h-100">

      <img
        src={product.images?.[0]}
        className="card-img-top"
        alt={product.title}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5>{product.title}</h5>

        <p className="fw-bold">${product.price}</p>

        <Link
          to={`/product/${product.id}/details`}
          className="btn btn-warning text-dark mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;