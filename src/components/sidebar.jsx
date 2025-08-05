import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, IconButton, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PublicIcon from '@mui/icons-material/Public';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportIcon from '@mui/icons-material/Support';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { styles } from './styles';

const DashboardSideNav = ({ mobileOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed
  const location = useLocation();

  const handleToggle = () => setCollapsed(!collapsed);

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, link: '/dashboard' },
    { label: 'ManageUser', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/manage-user' },
    { label: 'ManageFees', icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />, link: '/manage-fees' },
    { label: 'ManageRate', icon: <RateReviewIcon sx={{ fontSize: 18 }} />, link: '/manage-rate' },
    { label: 'ManageCountries', icon: <PublicIcon sx={{ fontSize: 18 }} />, link: '/manage-countries' },
    { label: 'ManageCurrency', icon: <CurrencyExchangeIcon sx={{ fontSize: 18 }} />, link: '/manage-currency' },
    { label: 'ManageProviders', icon: <BusinessIcon sx={{ fontSize: 18 }} />, link: '/manage-providers' },
    { label: 'Card', icon: <CreditCardIcon sx={{ fontSize: 18 }} />, link: '/card' },
    { label: 'Transaction', icon: <ReceiptIcon sx={{ fontSize: 18 }} />, link: '/transaction' },
    { label: 'Support', icon: <SupportIcon sx={{ fontSize: 18 }} />, link: '/support' },
    { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 18 }} />, link: '/profile' },
    { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/settings' },
    { label: 'logout', icon: <LogoutIcon sx={{ fontSize: 18 }} />, link: '/logout' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          ...styles.sidebar,
          width: collapsed ? 80 : 240,
          transition: 'width 0.3s ease-in-out',
        },
      }}
    >
      <Box sx={styles.header}>
        {collapsed ? (
          <IconButton onClick={handleToggle} sx={styles.toggleButton}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <>
            <Box sx={{ ml: 2 }}>
              <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40 }} />
            </Box>
            <IconButton onClick={handleToggle} sx={styles.toggleButton}>
              <ChevronLeftIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box sx={styles.navContainer}>
        {navItems.map((item) => (
          <Tooltip title={collapsed ? item.label : ''} placement="right" key={item.label}>
            <Box
              sx={{
                ...styles.navItem,
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive(item.link) ? styles.navItem.active.background : 'transparent',
                color: isActive(item.link) ? '#00FFCC' : '#B0B3B8',
                boxShadow: isActive(item.link) ? styles.navItem.active.shadow : 'none',
                '&:hover': {
                  background: isActive(item.link) ? styles.navItem.active.hover : 'rgba(0, 255, 204, 0.1)',
                  color: '#fff',
                },
              }}
              onClick={() => (window.location.href = item.link)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 2 }}>
                {item.icon}
                {!collapsed && <span style={styles.navText}>{item.label}</span>}
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { ...styles.sidebar, width: 240 },
        }}
      >
        <Box sx={styles.header}>
          <Box sx={{ ml: 2 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40 }} />
          </Box>
          <IconButton onClick={onClose} sx={styles.toggleButton}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={styles.navContainer}>
          {navItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                ...styles.navItem,
                justifyContent: 'flex-start',
                background: isActive(item.link) ? styles.navItem.active.background : 'transparent',
                color: isActive(item.link) ? '#00FFCC' : '#B0B3B8',
                boxShadow: isActive(item.link) ? styles.navItem.active.shadow : 'none',
                '&:hover': {
                  background: isActive(item.link) ? styles.navItem.active.hover : 'rgba(0, 255, 204, 0.1)',
                  color: '#fff',
                },
              }}
              onClick={() => (window.location.href = item.link)}
            >
              {item.icon}
              <span style={styles.navText}>{item.label}</span>
            </Box>
          ))}
        </Box>
      </Drawer>
    </Drawer>
  );
};

export default DashboardSideNav;