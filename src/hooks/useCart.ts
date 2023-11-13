import { useState, useEffect } from "react";

export default function useCart() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  function addToCart(item: CartItemType) {
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item }]);
    }
  }

  function removeFromCart(id: string) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function toggleCart() {
    setIsCartOpen((prevOpen) => !prevOpen);
  }

  return { cart, setCart, addToCart, removeFromCart, isCartOpen, toggleCart };
}
