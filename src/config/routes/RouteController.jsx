import { Navigate } from "react-router-dom";

const RouteController = ({ auth, children }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  // Protected Route
  if (auth?.required && !token) {
    return <Navigate to="/login" replace />;
  }

  // Already Logged In
  if (!auth?.required && token) {
    return <Navigate to="/" replace />;
  }

  // Role Check
  if (
    auth?.required &&
    auth?.roles &&
    auth.roles.length > 0 &&
    !auth.roles.includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteController;