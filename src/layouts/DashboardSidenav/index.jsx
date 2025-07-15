import { Box, Drawer } from '@mui/material';
import { useState } from 'react';
import { logoLayoutProps, mainNavList, bottomNavList, getIconForNav, navTextStyleExport, subNavTextStyleExport, logoutTextStyleExport } from '../Library/index';
import { useLocation } from 'react-router-dom';
import { dashboardDrawerWidth } from '../../constants/dimensions';
import { useLogout } from '../../Hooks/authentication';
import { styles } from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../DashboardSidenav/Header';
import MainNav from '../DashboardSidenav/MainNav';
import BottomNav from '../DashboardSidenav/BottomNav';

const DashboardSideNav = ({ mobileOpen, onClose, collapsed, handleToggleCollapse }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const location = useLocation();
  const { logout, loading } = useLogout();
  const [openSubNav, setOpenSubNav] = useState({});

  const handleSubNavToggle = (label) => setOpenSubNav((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (path, subMenu) => {
    const currentPath = location.pathname;
    if (path && path === currentPath) return true;
    if (!subMenu || !Array.isArray(subMenu) || subMenu.length < 1) return false;
    return subMenu.some((item) => item.link === currentPath);
  };

  const drawer = (
    <Box sx={{ ...styles.sidenav, ...(collapsed && styles.collapsedSidenav), backgroundColor: '#02042D', height: '100vh', overflow: 'hidden' }}>
      <Header collapsed={collapsed} handleToggleCollapse={handleToggleCollapse} isSmallScreen={isSmallScreen} onClose={onClose} />
      <Box sx={{
        display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', px: collapsed ? 1 : 2, py: 2, mt: 3.3, overflow: 'auto',
        '&::-webkit-scrollbar': { width: '1px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#808080', borderRadius: '1px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#606060' }, scrollbarWidth: 'thin', scrollbarColor: '#808080 transparent'
      }}>
        <MainNav
          mainNavList={mainNavList}
          isActive={isActive}
          openSubNav={openSubNav}
          handleSubNavToggle={handleSubNavToggle}
          collapsed={collapsed}
          location={location}
          styles={styles}
          navTextStyleExport={navTextStyleExport}
          subNavTextStyleExport={subNavTextStyleExport}
        />
        <Box sx={{ flex: 1 }} />
        <BottomNav bottomNavList={bottomNavList} logout={logout} loading={loading} collapsed={collapsed} styles={styles} logoutTextStyleExport={logoutTextStyleExport} />
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ ...styles.sidenavWrap, '& .nav-tooltip': { opacity: 0 }, '&:hover .nav-tooltip': { opacity: collapsed ? 1 : 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: dashboardDrawerWidth, backgroundColor: '#02042D', border: 'none', borderRight: '1px solid rgba(32, 139, 201, 0.3)' } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: collapsed ? 72 : dashboardDrawerWidth, transition: 'width 0.3s', overflowX: 'hidden', backgroundColor: '#02042D', border: 'none', borderRight: '1px solid rgba(32, 139, 201, 0.3)' } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSideNav;