const VALID_KEYS: (keyof FilterType)[] = [
  "variant",
  "color",
  "sort",
  "after",
  "before",
];

export function updateSearchParams(
  newValues: Partial<FilterType>,
  setParams: Function
) {
  const params = new URLSearchParams();
  for (let key of VALID_KEYS) {
    if (newValues[key] !== undefined && newValues[key] !== null) {
      params.set(key, newValues[key]!);
    } else if (newValues[key] === null) {
      params.delete(key);
    }
  }
  setParams(params, { replace: true });
}

export function getParamValue(value: string | null) {
  return value && value !== "" ? value : null;
}
