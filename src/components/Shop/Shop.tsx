import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterArea from "./FilterArea/FilterArea";
import BalloonsList from "./BalloonsList/BalloonsList";
import styles from "./Shop.module.css";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValues, setFilterValues] = useState<FilterType>({
    variant: searchParams.get("variant") || null,
    color: searchParams.get("color") || null,
    sort: searchParams.get("sort") || null,
    after: searchParams.get("after") || null,
    before: searchParams.get("before") || null,
  });

  return (
    <main className={styles.container}>
      <FilterArea
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        setSearchParams={setSearchParams}
      />
      <BalloonsList
        filterValues={filterValues}
        setSearchParams={setSearchParams}
      />
    </main>
  );
}
