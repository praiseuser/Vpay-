import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("PrivateRoute isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;