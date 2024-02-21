import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/homepage/App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalProvider } from "./context/modal-context/modal.context";

import "./assets/styles/index.css";
import ReactQueryContext from "./react-query/react-query.context";
import { Statistics } from "./pages/statistics/statistics";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/statistics/:transactionType",
    element: <Statistics />,
  },
]);

root.render(
  <React.StrictMode>
    <ReactQueryContext>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ReactQueryContext>
  </React.StrictMode>,
);

reportWebVitals();
