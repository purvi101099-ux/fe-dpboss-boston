import React from "react";
import { Navigate } from "react-router-dom";
import { TOKEN } from "@/utils/constants";

const NotFoundRedirect: React.FC = () => {
  const token = localStorage.getItem(TOKEN);

  // If token exists, redirect to admin dashboard
  // Otherwise, redirect to home page
  return <Navigate to={token ? "/admin/dashboard" : "/"} replace />;
};

export default NotFoundRedirect;
