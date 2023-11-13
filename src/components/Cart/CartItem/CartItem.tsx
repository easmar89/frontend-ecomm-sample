import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useQuery } from "urql";
import { GET_BALLOON_BY_ID } from "../../../graphql/queries";
import { Link } from "react-router-dom";
import LoadingComponent from "../../Miscellaneous/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../Miscellaneous/ErrorComponent/ErrorComponent";
import styles from "./CartItem.module.css";

type CartItemProps = {
  id: string;
};

export default function CartItem({ id }: CartItemProps) {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [{ data, fetching, error }] = useQuery({
    query: GET_BALLOON_BY_ID,
    variables: { id },
  });

  const itemInCart = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState<number>(
    itemInCart?.quantity !== undefined ? itemInCart.quantity : 1
  );

  useEffect(() => {
    if (data && data.balloon && !fetching && !error) {
      const itemInCart = cart.find((item) => item.id === id);
      if (itemInCart && itemInCart.price !== data.balloon.price) {
        const updatedCart = cart.map((item) =>
          item.id === id ? { ...item, price: data.balloon.price } : item
        );
        setCart(updatedCart);
      }
    }
  }, [data, fetching, error, id, cart, setCart]);

  useEffect(() => {
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    }
  }, [cart, id]);

  function handleDecreaseQuantity() {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    }
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  if (fetching) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <>
      {data && data.balloon ? (
        <div className={styles.cartItemContainer}>
          <img
            src={`${import.meta.env.VITE_GRAPHQL_HOST}${data.balloon.imageUrl}`}
            alt={data.balloon.name}
          />
          <div className={styles.itemDetails}>
            <h4>
              <Link to={`/balloons/${data.balloon.id}`}>
                {data.balloon.name}
              </Link>
            </h4>
            <div className={styles.cost}>
              <div className={styles.controllers}>
                <button onClick={handleDecreaseQuantity}>-</button>
                <p>{quantity}</p>
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
              <h3>{data.balloon.price * quantity} Sek</h3>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              className={styles.remove}
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
