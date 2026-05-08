import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  return (
    <article className="card h-100">
      <img
        src={product.images?.[0]}
        className="card-img-top"
        alt={product.title}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h2 className="h5">{product.title}</h2>

        <p className="fw-bold" aria-label={`Price ${product.price} dollars`}>
          ${product.price}
        </p>

        <Link
          to={`/product/${product.id}/details`}
          className="btn btn-warning text-dark mt-auto"
          aria-label={`View details for ${product.title}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
