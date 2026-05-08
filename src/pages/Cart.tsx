import { useState } from "react";
import { useCart } from "../context/CartContext";

const EXIT_MS = 400;

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const [leavingIds, setLeavingIds] = useState<Set<number>>(new Set());

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    setLeavingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      removeFromCart(id);
      setLeavingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, EXIT_MS);
  };

  const handleClear = () => {
    if (cart.length === 0) return;
    setLeavingIds(new Set(cart.map((item) => item.id)));
    setTimeout(() => {
      clearCart();
      setLeavingIds(new Set());
    }, EXIT_MS);
  };

  return (
    <main
      className="container mt-4 page-fade"
      aria-labelledby="cart-heading"
    >
      <h1 id="cart-heading">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <ul className="list-unstyled" aria-label="Items in cart">
          {cart.map((item) => (
            <li
              key={item.id}
              className={`cart-item card p-3 mb-3 ${leavingIds.has(item.id) ? "is-leaving" : ""}`}
            >
              <h2 className="h5 mb-1">{item.title}</h2>

              <p className="mb-2">${item.price}</p>

              <div
                className="d-flex align-items-center gap-2"
                role="group"
                aria-label={`Quantity controls for ${item.title}`}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => decreaseQty(item.id)}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>

                <span className="fw-bold" aria-live="polite">
                  <span className="visually-hidden">Quantity: </span>
                  {item.quantity}
                </span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                  onClick={() => increaseQty(item.id)}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <p className="h4">
        Total:{" "}
        <output aria-live="polite">${totalPrice}</output>
      </p>

      <button
        type="button"
        className="btn btn-danger"
        onClick={handleClear}
        disabled={cart.length === 0}
      >
        Clear Cart
      </button>
    </main>
  );
};

export default Cart;
