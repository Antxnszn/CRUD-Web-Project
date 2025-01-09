import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./RouterConfig"; // Importa la configuración de rutas

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
