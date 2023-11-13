import { useMemo } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./FilterArea.module.css";
import { VariantValues, ColorValues, SortValues } from "../../../shared/enums";
import { updateSearchParams } from "../../../utils/paramsUtils";
import SelectComponent from "../../Miscellaneous/SelectComponent/SelectComponent";
import Button from "../../Miscellaneous/Button/Button";

type FilterAreaProps = {
  filterValues: FilterType;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterType>>;
  setSearchParams: SetURLSearchParams;
};

export default function FilterArea({
  filterValues,
  setFilterValues,
  setSearchParams,
}: FilterAreaProps) {
  const VARIANT_OPTIONS = useMemo(() => Object.values(VariantValues), []);
  const COLOR_OPTIONS = useMemo(() => Object.values(ColorValues), []);
  const SORT_OPTIONS = useMemo(() => Object.values(SortValues), []);

  function handleFiltering() {
    const newFilterValues = {
      ...filterValues,
      after: null,
      before: null,
    };
    updateSearchParams(newFilterValues, setSearchParams);
    setFilterValues(newFilterValues);
  }

  function handleReset() {
    const newFilterValues = {
      variant: null,
      color: null,
      sort: null,
      after: null,
      before: null,
    };
    updateSearchParams(newFilterValues, setSearchParams);
    setFilterValues(newFilterValues);
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.filterContainer}>
        <SelectComponent
          label="Variant"
          options={VARIANT_OPTIONS}
          selectedValue={filterValues.variant}
          setSelectedValue={(value) =>
            setFilterValues((prev: FilterType) => ({ ...prev, variant: value }))
          }
        />
        <SelectComponent
          label="Color"
          options={COLOR_OPTIONS}
          selectedValue={filterValues.color}
          setSelectedValue={(value) =>
            setFilterValues((prev: FilterType) => ({ ...prev, color: value }))
          }
        />
        <SelectComponent
          label="Sort by"
          options={SORT_OPTIONS}
          selectedValue={filterValues.sort}
          setSelectedValue={(value) =>
            setFilterValues((prev: FilterType) => ({ ...prev, sort: value }))
          }
        />
        <div className={styles.buttonsContainer}>
          <Button onClick={handleFiltering} label="Apply" />
          <Button onClick={handleReset} label="Reset" />
        </div>
      </section>
    </div>
  );
}
