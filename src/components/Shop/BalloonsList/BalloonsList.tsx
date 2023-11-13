import { useQuery } from "urql";
import { useSearchParams, SetURLSearchParams } from "react-router-dom";
import { GET_BALLOONS } from "../../../graphql/queries";
import { getParamValue, updateSearchParams } from "../../../utils/paramsUtils";
import BalloonCard from "../BalloonsList/BalloonCard/BalloonCard";
import LoadingComponent from "../../Miscellaneous/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../Miscellaneous/ErrorComponent/ErrorComponent";
import Button from "../../Miscellaneous/Button/Button";
import styles from "./BalloonList.module.css";

type BalloonsListProps = {
  filterValues: FilterType;
  setSearchParams: SetURLSearchParams;
};

export default function BalloonsList({
  filterValues,
  setSearchParams,
}: BalloonsListProps) {
  const [searchParams] = useSearchParams();
  const variables = {
    filter: {
      variant: getParamValue(searchParams.get("variant")),
      color: getParamValue(searchParams.get("color")),
    },
    sort: getParamValue(searchParams.get("sort")),
    after: getParamValue(searchParams.get("after")),
    before: getParamValue(searchParams.get("before")),
  };
  const [{ data, fetching, error }] = useQuery<BalloonData>({
    query: GET_BALLOONS,
    variables,
  });

  if (fetching) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  if (!data) return <h3>No data available</h3>;
  if (data.balloons.edges.length === 0) return <h3>No data match</h3>;

  const pageInfo = data.balloons.pageInfo;
  const edges = data.balloons.edges;

  const handlePrevious = () => {
    updateSearchParams(
      {
        ...filterValues,
        before: edges[0].cursor,
        after: null,
      },
      setSearchParams
    );
  };

  const handleNext = () => {
    updateSearchParams(
      {
        ...filterValues,
        before: null,
        after: edges[edges.length - 1].cursor,
      },
      setSearchParams
    );
  };

  return (
    <div>
      {edges.map(({ node }) => (
        <BalloonCard key={node.id} {...node} />
      ))}
      <div className={styles.pagination}>
        {pageInfo.hasPreviousPage && (
          <Button onClick={handlePrevious} label="Previous" />
        )}
        {pageInfo.hasNextPage && <Button onClick={handleNext} label="Next" />}
      </div>
    </div>
  );
}
