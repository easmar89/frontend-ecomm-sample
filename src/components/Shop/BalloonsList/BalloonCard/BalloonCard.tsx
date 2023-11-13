import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import Button from "../../../Miscellaneous/Button/Button";
import styles from "./BalloonCard.module.css";

export default function BalloonCard(props: Balloon) {
  const { addToCart } = useContext(CartContext);

  return (
    <section className={styles.balloonContainer}>
      <div className={styles.banner}>50%</div>
      <img
        src={`${import.meta.env.VITE_GRAPHQL_HOST}${props.imageUrl}`}
        alt={props.name}
      />
      <div className={styles.balloonInfo}>
        <div className={styles.title}>
          <Link to={`/balloons/${props.id}`}>
            <h2>{props.name}</h2>
          </Link>
        </div>
        <p>{props.description}</p>
        <section className={styles.actionContainer}>
          <div className={styles.buttons}>
            <Button
              onClick={() =>
                addToCart({ id: props.id, quantity: 1, price: props.price })
              }
              label="Add to cart"
            />
          </div>
          <h2>
            {props.price} <span className={styles.currency}>SEK</span>
          </h2>
        </section>
      </div>
    </section>
  );
}
