import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";

import App from "./app/app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>
);
