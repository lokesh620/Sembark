import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./pages/Header";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <ProductProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id/details" element={<ProductDetails />} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;