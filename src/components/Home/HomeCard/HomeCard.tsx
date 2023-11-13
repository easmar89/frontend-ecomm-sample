import { useQuery } from "urql";
import { Link } from "react-router-dom";
import styles from "./HomeCard.module.css";
import { GET_BALLOON_BY_TYPE } from "../../../graphql/queries";
import LoadingComponent from "../../Miscellaneous/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../Miscellaneous/ErrorComponent/ErrorComponent";

type Props = {
  type: string;
};

type Balloon = {
  id: string;
  name: string;
  imageUrl: string;
};

type BalloonEdge = {
  node: Balloon;
};

type BalloonData = {
  balloons: {
    edges: BalloonEdge[];
  };
};

export default function HomeCard({ type }: Props) {
  const [{ data, fetching, error }] = useQuery<BalloonData>({
    query: GET_BALLOON_BY_TYPE,
    variables: { type },
  });

  if (fetching) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  const balloon = data?.balloons.edges[0]?.node;

  return (
    <section className={styles.container}>
      {balloon && (
        <div className={styles.imageContainer} key={balloon.id}>
          <img
            src={`${import.meta.env.VITE_GRAPHQL_HOST}${balloon.imageUrl}`}
            alt={`${type} balloons`}
          />
          <Link
            className={styles.imageText}
            to={{ pathname: `/shop`, search: `variant=${type}` }}
          >
            {type}
          </Link>
        </div>
      )}
    </section>
  );
}
