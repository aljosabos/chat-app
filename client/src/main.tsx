import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/routes.tsx";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { persistor, store } from "./store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
