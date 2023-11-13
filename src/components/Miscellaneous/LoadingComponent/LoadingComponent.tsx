import { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";

const override: CSSProperties = {
  display: "block",
  margin: "32px auto",
  borderColor: "black",
};

export default function LoadingComponent() {
  return (
    <div className="sweet-loading">
      <BarLoader
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
