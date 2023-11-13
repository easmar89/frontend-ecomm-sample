import { createContext } from "react";

type CartContextProps = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
};

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isCartOpen: false,
  toggleCart: () => {},
  setCart: () => {},
});
