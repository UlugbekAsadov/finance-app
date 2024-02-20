import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalProvider } from "./context/modal-context/modal.context";

import "./assets/styles/index.css";
import ReactQueryContext from "./react-query/react-query.context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/statistics/:type",
    element: <div>About</div>,
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
