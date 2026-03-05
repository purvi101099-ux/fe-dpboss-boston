import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "@/utils/constants";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem(TOKEN);
  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
