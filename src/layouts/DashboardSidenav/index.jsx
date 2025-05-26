import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styles } from '../DashboardNav/styles';
import { logoLayoutProps, mainNavList, bottomNavList, getIconForNav, navTextStyleExport, logoutTextStyleExport } from '../Library/index';
import DashboardNavigLink from '../DashboardNavLink';
import { useLocation } from 'react-router-dom';
import { dashboardDrawerWidth } from '../../constants/dimensions';
import { useLogout } from '../../Hooks/authentication';

const DashboardSideNav = ({ mobileOpen, onClose, onTransitionEnd }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const location = useLocation();
  const { logout, loading } = useLogout();

  const isActive = (path, subMenu) => {
    const currentPath = location.pathname;
    if (path === currentPath) return true;
    if (subMenu.length < 1) return false;
    return subMenu.some((item) => item.link === currentPath);
  };

  const drawer = (
    <Box sx={{ ...styles.sidenav, borderRadius: '2px' }}>
      <Box sx={styles.logoWrap}>
        <Stack {...logoLayoutProps}>
          <Stack spacing={1} direction={{ xs: 'row', md: 'row' }}>
            <img
              src="/image 5.png"
              style={{ height: '40px', objectFit: 'contain', marginTop: '25px', marginLeft: '15px' }}
              alt="logo"
            />
          </Stack>
          {isSmallScreen && (
            <IconButton onClick={onClose} sx={{ px: '5rem', color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: { xs: 'auto', sm: 'visible' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mt: 4 }}>
          {mainNavList.map((item, index) => {
            const isActiveItem = isActive(item.link, item.subNav);
            return (
              <DashboardNavigLink
                key={index}
                to={item.link}
                isactive={isActiveItem ? 1 : 0}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getIconForNav(item, isActiveItem)}
                  <span style={navTextStyleExport}>{item.label}</span>
                </Box>
              </DashboardNavigLink>
            );
          })}
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mb: 4, mt: 4 }}>
          {bottomNavList.map((item, index) => {
            const isActiveItem = isActive(item.link, item.subNav);
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  pl: 2,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onClick={logout}
              >
                {getIconForNav(item, isActiveItem)}
                <span style={logoutTextStyleExport}>{item.label}</span>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={styles.sidenavWrap}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        onTransitionEnd={onTransitionEnd}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: dashboardDrawerWidth,
            backgroundColor: '#02042D',
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: dashboardDrawerWidth,
            backgroundColor: '#02042D',
            border: 'none',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSideNav;