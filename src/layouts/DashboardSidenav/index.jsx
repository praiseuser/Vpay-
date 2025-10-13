import { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardDrawerWidth } from "../../constants/dimensions";
import { useAuth } from "../../context/AuthContext";
import SidebarHeader from "../DashboardSidenav/SidebarHeader";
import SidebarAvatar from "../DashboardSidenav/SidebarAvatar";
import SidebarNavItems from "../DashboardSidenav/SidebarNavItems";
import { styles } from "./styles";
import { getNav } from "./navUtils";

export default function DashboardSideNav({ collapsed, handleToggleCollapse }) {
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const userRole = Number(user?.role);
  const subRoles = user?.sub_role || [];

  const navItems = getNav(userRole, subRoles);
  const avatarText = userRole === 1 ? "S" : "A";
  const displayName = userRole === 1 ? "Super Admin" : "Admin";

  const handleClick = (path) => {
    if (path === "/logout") logout();
    else navigate(path);
  };

  const handleToggle = () => {
    setLocalCollapsed(!localCollapsed);
    handleToggleCollapse();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          ...styles.sidebar,
          width: localCollapsed ? 80 : dashboardDrawerWidth,
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      <SidebarHeader collapsed={localCollapsed} onToggle={handleToggle} />

      <AnimatePresence mode="wait">
        {!localCollapsed && (
          <motion.div
            key="avatar"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SidebarAvatar
              avatarText={avatarText}
              displayName={displayName}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={styles.navContainer}>
        <SidebarNavItems
          navItems={navItems}
          collapsed={localCollapsed}
          isActive={isActive}
          onClick={handleClick}
        />
      </Box>
    </Drawer>
  );
}
