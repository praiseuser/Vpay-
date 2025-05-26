import { useState } from 'react';
import { Box } from '@mui/material';
import DashboardNav from "../DashboardNav";
import DashboardSideNav from "../DashboardSidenav";
import { useLocation } from 'react-router-dom';
import { dashboardDrawerWidth, dashboardNavHeight, } from '../../constants/dimensions';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getCurrentRoute = () => {
    const path = location.pathname.split('/').pop();
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNav
        handleDrawerToggle={handleDrawerToggle}
        currentRoute={getCurrentRoute()}
        mobileOpen={mobileOpen}
      />
      <DashboardSideNav
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
        onTransitionEnd={() => {}}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: `${dashboardNavHeight}px`,
          ml: { sm: `${dashboardDrawerWidth}px` },
          width: { xs: '100%', sm: `calc(100% - ${dashboardDrawerWidth}px)` },
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;