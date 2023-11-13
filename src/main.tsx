import React from "react";
import ReactDOM from "react-dom/client";
import {
  Client,
  Provider,
  cacheExchange,
  fetchExchange,
  CombinedError,
} from "urql";
import { retryExchange } from "@urql/exchange-retry";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const retryOptions = {
  initialDelayMs: 100,
  maxDelayMs: 2000,
  randomDelay: true,
  maxNumberAttempts: 5,
  retryIf: (error: CombinedError | undefined) => {
    return Boolean(
      error &&
        error.graphQLErrors.some(
          (graphqlError) =>
            graphqlError.message ===
            "There was a consistently expected yet unknown error."
        )
    );
  },
};

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, retryExchange(retryOptions), fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
