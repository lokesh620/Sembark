import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  const itemNoun = cart.length === 1 ? "item" : "items";

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm"
        aria-label="Main"
      >
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-warning"
        >
          Sembark
        </Link>

        <div className="ms-auto d-flex align-items-center gap-4">
          <Link
            to="/cart"
            className="btn btn-outline-light position-relative"
            aria-label={`Cart, ${cart.length} ${itemNoun}`}
          >
            <span aria-hidden="true">🛒</span> Cart
            <span
              key={cart.length}
              className="cart-badge badge bg-danger position-absolute top-0 start-100 translate-middle"
              aria-hidden="true"
            >
              {cart.length}
            </span>
          </Link>

          <div className="dropdown">
            <img
              src="https://i.pravatar.cc/40"
              alt=""
              role="presentation"
              className="rounded-circle border border-2 border-light"
              width="40"
              height="40"
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
