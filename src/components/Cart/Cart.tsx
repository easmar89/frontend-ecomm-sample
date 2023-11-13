import { useContext, useMemo } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem/CartItem";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Cart.module.css";

export default function Cart() {
  const { isCartOpen, toggleCart, cart } = useContext(CartContext);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <div className={`${styles.cart} ${isCartOpen ? styles.open : ""}`}>
      <section className={styles.cartHeader}>
        <h1>Cart</h1>
        <AiOutlineClose onClick={toggleCart} />
      </section>
      <section>
        {cart.length === 0 ? (
          <p>Your cart is empty! Shopping time maybe?</p>
        ) : (
          cart.map((item) => <CartItem key={item.id} id={item.id} />)
        )}
      </section>
      {total ? (
        <button className={styles.checkoutButton}>
          <strong>{total} SEK</strong> <code>&#8212;</code> Checkout
        </button>
      ) : null}
    </div>
  );
}
