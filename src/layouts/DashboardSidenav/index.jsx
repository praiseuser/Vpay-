// ✅ DashboardSideNav.jsx — Sidebar for Admin Dashboard
// ------------------------------------------------------

// Importing required hooks and components from React & React Router
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Importing Material UI components for UI design
import {
  Drawer,      // Sidebar container
  Box,         // Wrapper for layout structure
  Avatar,      // Circular user icon
  Typography,  // Text display
  Tooltip,     // Hover tooltip
  IconButton,  // Clickable icon
} from "@mui/material";

// Importing MUI icons used in the sidebar
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupportIcon from "@mui/icons-material/Support";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Importing local styles and constants
import { styles } from "./styles";
import { dashboardDrawerWidth } from "../../constants/dimensions";
import { useAuth } from "../../context/AuthContext"; // Authentication context

//------------------------------------------------------//
// 🔹 getNav function — builds the sidebar navigation items dynamically
//------------------------------------------------------//

const getNav = (role, subRoles) => {
  // Check if the current user is a Super Admin
  const isSuperAdmin = role === 1;

  // Define the navigation structure
  const navs = {
    admin: [
      // Everyone (Admin + Super Admin) sees the Dashboard
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
      },

      // 🔸 Each of the following items appear only if:
      // - Super Admin (isSuperAdmin = true) OR
      // - The admin's subRoles array from backend includes that specific ID

      (isSuperAdmin || subRoles.includes(1)) && {
        label: "Transaction",
        path: "/dashboard/transaction",
        icon: <ReceiptIcon />,
      },
      (isSuperAdmin || subRoles.includes(2)) && {
        label: "Support",
        path: "/dashboard/support",
        icon: <SupportIcon />,
      },
      (isSuperAdmin || subRoles.includes(3)) && {
        label: "Manage Fees",
        path: "/dashboard/fees",
        icon: <AttachMoneyIcon />,
      },
      (isSuperAdmin || subRoles.includes(4)) && {
        label: "Manage Rate",
        path: "/dashboard/rate",
        icon: <RateReviewIcon />,
      },
      (isSuperAdmin || subRoles.includes(5)) && {
        label: "Manage Currency",
        path: "/dashboard/currency",
        icon: <CurrencyExchangeIcon />,
      },
      (isSuperAdmin || subRoles.includes(6)) && {
        label: "Manage Countries",
        path: "/dashboard/countries",
        icon: <PublicIcon />,
      },

      // ✅ Only Super Admin can manage other admins
      isSuperAdmin && {
        label: "Manage Admin",
        path: "/dashboard/admin",
        icon: <PeopleIcon />,
      },

      // Everyone sees settings and logout
      {
        label: "Settings",
        path: "/dashboard/settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Logout",
        path: "/logout",
        icon: <LogoutIcon />,
      },
    ].filter(Boolean), // Removes any 'false' entries from the list
  };

  // Return the navigation items for admin users
  return navs["admin"];
};

//------------------------------------------------------//
// 🔹 Main Sidebar Component — DashboardSideNav
//------------------------------------------------------//

export default function DashboardSideNav({ collapsed, handleToggleCollapse }) {
  // Local state for collapsing/expanding the sidebar
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);

  // Navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Auth context: get the logged-in user and logout function
  const { logout, user } = useAuth();

  // Toggle function for sidebar collapse
  const handleToggle = () => {
    setLocalCollapsed(!localCollapsed);
    handleToggleCollapse();
  };

  // Extract user role and sub_roles from backend user object
  const userRole = Number(user?.role); // role = 1 (Super Admin), 2 (Admin)
  const subRoles = user?.sub_role || []; // sub_role array from backend

  // Build navigation menu based on role & permissions
  const navItems = getNav(userRole, subRoles);

  // Display avatar letter and role name
  const avatarText = userRole === 1 ? "S" : "A";
  const displayName = userRole === 1 ? "Super Admin" : "Admin";

  // Function to check if the current page matches nav item
  const isActive = (path) => location.pathname === path;

  // Handle clicks on sidebar items
  const handleClick = (path) => {
    if (path === "/logout") {
      logout(); // Log out the user
    } else {
      navigate(path); // Navigate to the selected page
    }
  };

  //------------------------------------------------------//
  // 🔹 Sidebar UI Layout
  //------------------------------------------------------//

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          ...styles.sidebar,
          width: localCollapsed ? 80 : dashboardDrawerWidth, // Collapse effect
          transition: "width 0.3s ease-in-out", // Smooth transition
        },
      }}
    >
      {/* 🔸 Top section with logo and collapse button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {/* Show logo only when sidebar is expanded */}
        {!localCollapsed && (
          <Box sx={{ ml: 1 }}>
            <img
              src="/Vpaylogo.png"
              alt="Logo"
              style={{ width: 80, height: 30 }}
            />
          </Box>
        )}

        {/* Collapse toggle button */}
        <IconButton onClick={handleToggle} sx={styles.toggleButton}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {/* 🔸 Avatar and Role Display Section */}
      {!localCollapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            px: 1,
            py: 2,
            backgroundColor: "rgba(255,255,255,0.03)",
            borderRadius: 2,
            mx: 2,
          }}
        >
          {/* User Avatar Circle */}
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mb: 1,
              border: "2px solid #00FFCC",
              bgcolor: "#02042D",
              color: "#00FFCC",
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            {avatarText}
          </Avatar>

          {/* Display Role (Super Admin / Admin) */}
          <Typography
            variant="subtitle1"
            color="#fff"
            sx={{ fontWeight: 600, mt: 1, textAlign: "center" }}
          >
            {displayName}
          </Typography>
        </Box>
      )}

      {/* 🔸 Navigation Links Section */}
      <Box sx={styles.navContainer}>
        {navItems.map((item) => (
          <Tooltip
            title={localCollapsed ? item.label : ""} // Tooltip when collapsed
            placement="right"
            key={item.label}
          >
            <Box
              onClick={() => handleClick(item.path)}
              sx={{
                ...styles.navItem,
                justifyContent: localCollapsed ? "center" : "flex-start",
                background: isActive(item.path)
                  ? "rgba(0,255,204,0.1)"
                  : "transparent",
                color: isActive(item.path) ? "#00FFCC" : "#B0B3B8",
                "&:hover": {
                  background: "rgba(0,255,204,0.1)",
                  color: "#fff",
                },
              }}
            >
              {/* Icon for the nav item */}
              {item.icon}

              {/* Label text (hidden when collapsed) */}
              {!localCollapsed && (
                <span style={styles.navText}>{item.label}</span>
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Drawer>
  );
}
