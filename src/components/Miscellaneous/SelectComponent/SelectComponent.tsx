import styles from "./SelectComponent.module.css";

type SelectFilterProps = {
  label: string;
  options: string[];
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
};

export default function SelectComponent({
  label,
  options,
  selectedValue,
  setSelectedValue,
}: SelectFilterProps) {
  return (
    <div className={styles.filter}>
      <label>
        <h3>{label}:</h3>
        <select
          value={selectedValue || ""}
          onChange={(e) => setSelectedValue(e.target.value || null)}
        >
          <option value="">All</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
