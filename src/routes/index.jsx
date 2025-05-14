import { useLocation } from "react-router-dom";
import DashboardRoutes from "./Dashboard";
import PublicRoutes from "./Public";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Router() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  const dashboardPath = "/dashboard";
  const isDashboardRoute = pathname.startsWith(dashboardPath);

  if (isDashboardRoute && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isDashboardRoute ? <DashboardRoutes /> : <PublicRoutes />;
}
