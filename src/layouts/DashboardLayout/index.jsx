import { useState } from 'react';
import { Box } from '@mui/material';
import DashboardNav from '../DashboardNav';
import DashboardSideNav from '../DashboardSidenav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dashboardDrawerWidth, dashboardNavHeight, dashboardLayoutPad } from '../../constants/dimensions';
import { styles } from '../DashboardSidenav/styles';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true); 
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const getCurrentRoute = () => {
    const path = location.pathname.split('/').pop();
    if (path === '' || path === 'dashboard') {
      return user?.user ? 'Welcome Back' : 'Guest Dashboard';
    }
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
  };

  const currentRoute = getCurrentRoute();
  const titleStyle = {
    fontFamily: 'Mada, sans-serif',
    fontSize: currentRoute === 'Welcome Back' || currentRoute === 'Guest Dashboard' ? { xs: 16, sm: 14 } : { xs: 18, sm: 16 },
    fontWeight: currentRoute === 'Welcome Back' || currentRoute === 'Guest Dashboard' ? 600 : 700,
    color: '#0C0B18',
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Box sx={styles.wrap}>
      <DashboardNav
        handleDrawerToggle={handleDrawerToggle}
        currentRoute={currentRoute}
        titleStyle={titleStyle}
        mobileOpen={mobileOpen}
        collapsed={collapsed}
      />
      <DashboardSideNav
        mobileOpen={mobileOpen}
        onClose={handleDrawerClose}
        onTransitionEnd={() => {}}
        collapsed={collapsed}
        handleToggleCollapse={handleToggleCollapse}
      />
      <Box
        component="main"
        sx={{
          ...styles.content,
          pl: collapsed ? `${dashboardLayoutPad}px` : `${dashboardLayoutPad + (dashboardDrawerWidth - 80)}px`,
          
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;