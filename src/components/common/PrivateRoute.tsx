import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "@/utils/constants";

const PrivateRoute: React.FC = () => {
  const token = true; // localStorage.getItem(TOKEN); // Temporary bypass
  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
