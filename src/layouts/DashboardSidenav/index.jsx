import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, IconButton, Tooltip, CircularProgress } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
import ListIcon from '@mui/icons-material/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { dashboardDrawerWidth } from '../../constants/dimensions';
import { useLogout } from '../../Hooks/authentication';
import { styles } from './styles';

const DashboardSideNav = ({ collapsed, handleToggleCollapse }) => {
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);
  const [openProviders, setOpenProviders] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, loading } = useLogout();

  const handleToggle = () => {
    setLocalCollapsed(!localCollapsed);
    handleToggleCollapse();
  };

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, link: '/dashboard' },
    { label: 'Manage User', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/dashboard/user' },
    { label: 'Manage Admin', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/dashboard/admin' },
    { label: 'Manage Fees', icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />, link: '/dashboard/fees' },
    { label: 'Manage Rate', icon: <RateReviewIcon sx={{ fontSize: 18 }} />, link: '/dashboard/rate' },
    { label: 'Manage Countries', icon: <PublicIcon sx={{ fontSize: 18 }} />, link: '/dashboard/countries' },
    { label: 'Manage Currency', icon: <CurrencyExchangeIcon sx={{ fontSize: 18 }} />, link: '/dashboard/currency' },
    { label: 'Manage Providers', icon: <BusinessIcon sx={{ fontSize: 18 }} />, isDropdown: true },
    { label: 'Card', icon: <CreditCardIcon sx={{ fontSize: 18 }} />, link: '/dashboard/card' },
    { label: 'Transaction', icon: <ReceiptIcon sx={{ fontSize: 18 }} />, link: '/dashboard/transaction' },
    { label: 'Support', icon: <SupportIcon sx={{ fontSize: 18 }} />, link: '/dashboard/support' },
    { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 18 }} />, link: '/dashboard/profile' },
    { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/dashboard/settings' },
    { label: 'Account Password', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/dashboard/account-password' },
    { label: 'logout', icon: <LogoutIcon sx={{ fontSize: 18 }} />, link: '/logout', onClick: logout },
  ];

  const providerSubMenu = [
    { label: 'Network Provider', icon: <ListIcon sx={{ fontSize: 18 }} />, link: '/dashboard/network-provider' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleItemClick = (item) => {
    if (item.isDropdown) {
      setOpenProviders(!openProviders);
    } else if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.link);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          ...styles.sidebar,
          width: localCollapsed ? 80 : dashboardDrawerWidth,
          transition: 'width 0.3s ease-in-out',
        },
      }}
    >
      {/* Sidebar Header */}
      <Box sx={styles.header}>
        {localCollapsed ? (
          <IconButton onClick={handleToggle} sx={styles.toggleButton}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <>
            <Box sx={{ ml: 2, mt: 1, }}>
              <img src="/Vpaylogo.png" alt="Logo" style={{ width: 80, height: 30 }} />
            </Box>
            <IconButton onClick={handleToggle} sx={styles.toggleButton}>
              <ChevronLeftIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Navigation Items */}
      <Box sx={styles.navContainer}>
        {navItems.map((item) => (
          <Tooltip title={localCollapsed ? item.label : ''} placement="right" key={item.label}>
            <Box
              sx={{
                ...styles.navItem,
                minHeight: 36,
                height: 36,
                justifyContent: localCollapsed ? 'center' : 'flex-start',
                background: isActive(item.link) ? styles.navItem.active.background : 'transparent',
                color: isActive(item.link) ? '#00FFCC' : '#B0B3B8',
                boxShadow: isActive(item.link) ? styles.navItem.active.shadow : 'none',
                cursor: 'pointer',
                ...(item.isDropdown
                  ? {} // no hover effect for dropdown
                  : {
                      '&:hover': {
                        background: isActive(item.link) ? styles.navItem.active.hover : 'rgba(0, 255, 204, 0.1)',
                        color: '#fff',
                      },
                    }),
              }}
              onClick={() => handleItemClick(item)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: localCollapsed ? 0 : 2, width: '100%', justifyContent: localCollapsed ? 'center' : 'space-between' }}>
                {/* Left Section: Icon + Label */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: localCollapsed ? 0 : 2 }}>
                  {item.icon}
                  {!localCollapsed && <span style={styles.navText}>{item.label}</span>}
                  {loading && item.label === 'logout' && (
                    <CircularProgress size={16} sx={{ color: '#fff', ml: 1 }} />
                  )}
                </Box>

                {/* Right Section: Dropdown Icon */}
                {item.isDropdown && !localCollapsed && (
                  openProviders ? <ExpandLessIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18 }} />
                )}
              </Box>
            </Box>

            {/* Dropdown Menu */}
            {item.isDropdown && openProviders && !localCollapsed && (
              <Box sx={{ pl: 4 }}>
                {providerSubMenu.map((subItem) => (
                  <Box
                    key={subItem.label}
                    sx={{
                      ...styles.navItem,
                      minHeight: 32,
                      background: isActive(subItem.link) ? styles.navItem.active.background : 'transparent',
                      color: isActive(subItem.link) ? '#00FFCC' : '#B0B3B8',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      padding: '6px 12px',
                      '&:hover': {
                        background: isActive(subItem.link) ? styles.navItem.active.hover : 'rgba(0, 255, 204, 0.1)',
                        color: '#fff',
                      },
                    }}
                    onClick={() => navigate(subItem.link)}
                  >
                    {subItem.icon}
                    <span style={{ marginLeft: 8 }}>{subItem.label}</span>
                  </Box>
                ))}
              </Box>
            )}
          </Tooltip>
        ))}
      </Box>
    </Drawer>
  );
};

export default DashboardSideNav;
