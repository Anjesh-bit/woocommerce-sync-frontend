import { Fragment, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { mainRoutes } from "./routes/main-routes";
import Home from "../pages/home";

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Home />
            </Fragment>
          }
        />

        {mainRoutes.map((route) => (
          <Route path={route.path} key={route.path} element={route.render()} />
        ))}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
