import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useQuery } from "urql";
import { GET_BALLOON_BY_ID } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import LoadingComponent from "../Miscellaneous/LoadingComponent/LoadingComponent";
import ErrorComponent from "../Miscellaneous/ErrorComponent/ErrorComponent";
import styles from "./BalloonDetails.module.css";

type SingleBalloonData = {
  balloon: Balloon;
};

export default function BalloonDetails() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const [{ data, fetching, error }] = useQuery<SingleBalloonData>({
    query: GET_BALLOON_BY_ID,
    variables: { id },
  });

  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  if (fetching) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  if (!data || !data.balloon) return <h3>No balloon data</h3>;

  const { name, price, imageUrl, availableSince, variant, color, description } =
    data.balloon;

  const totalPrice = quantity * price;

  const balloonDetails: CartItemType = {
    id: id!,
    quantity,
    price,
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img
            src={`${import.meta.env.VITE_GRAPHQL_HOST}${imageUrl}`}
            alt={name}
          />
        </div>
        <div className={styles.detailsContainer}>
          <h1>{name}</h1>
          <p>
            <i>
              Available since:
              {new Date(availableSince || "").toLocaleDateString()}
            </i>
          </p>
          <p className={styles.price}>Price: {price} SEK</p>

          <div className={styles.quantity}>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button
            className={styles.addToCartButton}
            onClick={() => addToCart(balloonDetails)}
          >
            Add to Cart <code>&#8212;</code> <b>{`${totalPrice} SEK`}</b>
          </button>

          <p>Variant: {variant}</p>
          <p>Color: {color}</p>
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
