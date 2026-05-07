import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">

      <Link
        to="/"
        className="navbar-brand fw-bold fs-3 text-warning"
      >
        Sembark
      </Link>

      <div className="ms-auto d-flex align-items-center gap-4">
        <Link to="/cart" className="btn btn-outline-light position-relative">
          🛒 Cart
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cart.length}
          </span>
        </Link>

        {/* Profile */}
        <div className="dropdown">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-circle border border-2 border-light"
            width="40"
            height="40"
            style={{ cursor: "pointer", objectFit: "cover" }}
          />
        </div>

      </div>
    </nav>
  );
};

export default Header;