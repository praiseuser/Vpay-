import { useLocation } from "react-router-dom";
import DashboardRoutes from "./Dashboard";
import PublicRoutes from "./Public";

export default function Router() {
  const { pathname } = useLocation();

  const dashboardPath = "/dashboard";
  const isDashboardRoute = pathname.startsWith(dashboardPath);

  return isDashboardRoute ? <DashboardRoutes /> : <PublicRoutes />;
}
