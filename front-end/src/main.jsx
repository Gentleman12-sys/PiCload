import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "./store/store.js";

import App from "./components/app/App";

import "./index.scss";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </QueryClientProvider>
);