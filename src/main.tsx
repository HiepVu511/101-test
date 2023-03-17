import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./routes/root";
import LoginRoute from "./routes/login";
import InvoiceDetails from "./routes/invoiceDetails";
import NewInvoice from "./routes/newInvoice";
import IndexRoute from "./routes/index";
import { ErrorPage } from "./ErrorPage";

// TODO: use react-router loaders and actions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "invoices/:invoiceId",
        element: <InvoiceDetails />,
      },
      {
        path: "invoices/new",
        element: <NewInvoice />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
