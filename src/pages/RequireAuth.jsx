// src/routes/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}

export default function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
