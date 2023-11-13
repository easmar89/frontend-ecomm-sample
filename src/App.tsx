import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Shop from "./components/Shop/Shop";
import BalloonDetails from "./components/BalloonDetails/BalloonDetails";
import Cart from "./components/Cart/Cart";
import { CartContext } from "./context/CartContext";
import useCart from "./hooks/useCart";

export default function App() {
  const { cart, setCart, addToCart, removeFromCart, isCartOpen, toggleCart } =
    useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isCartOpen,
        toggleCart,
        setCart,
      }}
    >
      <Header onCartClick={toggleCart} cartCount={cartCount} />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/balloons/:id" element={<BalloonDetails />} />
      </Routes>
      <Footer />
    </CartContext.Provider>
  );
}
