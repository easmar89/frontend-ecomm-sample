import { CombinedError } from "@urql/core";
import styles from "./ErrorComponent.module.css";

type Props = {
  error: CombinedError;
  onRetry?: () => void;
  message?: string;
};

export default function ErrorComponent({ error, onRetry, message }: Props) {
  let errorMessage = "An unexpected error has occurred.";

  if (error.networkError) {
    errorMessage = "There seems to be some network problem. Please try again.";
  } else if (message) {
    errorMessage = message;
  } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    // If the GraphQL server is sending an appropriate and user-friendly error message:
    // errorMessage = error.graphQLErrors[0].message;
    // Or a some generic one:
    errorMessage = "Invalid request, please try again";
    // or different errors, based on how the server is handling this
  }

  return (
    <div className={styles.errorContainer} aria-live="polite">
      <h2>{errorMessage}</h2>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
