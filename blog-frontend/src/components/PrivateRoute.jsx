// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ roles }) {
  const { user, isAuthenticated } = useContext(AuthContext);

  
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
