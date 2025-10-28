import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import DashboardNav from '../DashboardNav';
import DashboardSideNav from '../DashboardSidenav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dashboardDrawerWidth, dashboardNavHeight, dashboardLayoutPad } from '../../constants/dimensions';
import { styles } from '../DashboardSidenav/styles';
import { useLogout } from '../../Hooks/authentication';
import { toast } from 'react-toastify';
import CustomErrorToast from '../../components/CustomErrorToast';

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { logout } = useLogout();
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    clearTimeout(warningTimerRef.current);

    warningTimerRef.current = setTimeout(() => {
      toast(<CustomErrorToast message="You will be logged out in 1 minute due to inactivity." />);
    }, 29 * 60 * 1000);

    timerRef.current = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000);
  };

  useEffect(() => {
    const events = ["mousemove", "keypress", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

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
    fontSize:
      currentRoute === 'Welcome Back' || currentRoute === 'Guest Dashboard'
        ? { xs: 16, sm: 14 }
        : { xs: 18, sm: 16 },
    fontWeight:
      currentRoute === 'Welcome Back' || currentRoute === 'Guest Dashboard'
        ? 600
        : 700,
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
    <Box sx={{ ...styles.wrap, backgroundColor: '#E1EFF8', minHeight: '100vh' }}>
      
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
          pl: collapsed
            ? `calc(80px + 16px)`
            : `${dashboardLayoutPad + dashboardDrawerWidth}px`,
          pr: '16px',
          pt: `${dashboardNavHeight + dashboardLayoutPad}px`,
          pb: '16px',
          backgroundColor: '#d1f7efff',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
