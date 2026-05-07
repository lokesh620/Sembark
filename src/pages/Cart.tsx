import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="card p-3 mb-3">

          <h5>{item.title}</h5>

          <p>${item.price}</p>

          <div className="d-flex align-items-center gap-2">

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => decreaseQty(item.id)}
            >
              -
            </button>

            <span className="fw-bold">
              {item.quantity}
            </span>

            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => increaseQty(item.id)}
            >
              +
            </button>

            <button
              className="btn btn-sm btn-dark"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>

          </div>
        </div>
      ))}

      <hr />

      <h4>Total: ${totalPrice}</h4>

      <button
        className="btn btn-danger"
        onClick={clearCart}
      >
        Clear Cart
      </button>

    </div>
  );
};

export default Cart;