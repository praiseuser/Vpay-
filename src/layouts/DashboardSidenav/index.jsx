import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  Tooltip,
  CircularProgress,
  Avatar,
  Typography,
} from '@mui/material';
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
import { useAuth } from '../../context/AuthContext';

// Sidebar items with roles (1 = Super Admin, 2 = Admin)
const sidebarConfig = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, link: '/dashboard', roles: [1, 2] },
  { label: 'Manage User', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/dashboard/user', roles: [1, 2] },
  { label: 'Manage Admin', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/dashboard/admin', roles: [1] },
  { label: 'Manage Fees', icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />, link: '/dashboard/fees', roles: [1, 2] },
  { label: 'Manage Rate', icon: <RateReviewIcon sx={{ fontSize: 18 }} />, link: '/dashboard/rate', roles: [1, 2] },
  { label: 'Manage Countries', icon: <PublicIcon sx={{ fontSize: 18 }} />, link: '/dashboard/countries', roles: [1, 2] },
  { label: 'Manage Currency', icon: <CurrencyExchangeIcon sx={{ fontSize: 18 }} />, link: '/dashboard/currency', roles: [1, 2] },
  { label: 'Manage Providers', icon: <BusinessIcon sx={{ fontSize: 18 }} />, isDropdown: true, roles: [1, 2] },
  { label: 'Card', icon: <CreditCardIcon sx={{ fontSize: 18 }} />, link: '/dashboard/card', roles: [1, 2] },
  { label: 'Transaction', icon: <ReceiptIcon sx={{ fontSize: 18 }} />, link: '/dashboard/transaction', roles: [1, 2] },
  { label: 'Support', icon: <SupportIcon sx={{ fontSize: 18 }} />, link: '/dashboard/support', roles: [1, 2] },
  { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 18 }} />, link: '/dashboard/profile', roles: [1, 2] },
  { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/dashboard/settings', roles: [1, 2] },
  { label: 'Account Password', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/dashboard/account-password', roles: [1, 2] },
  { label: 'Payout Method', icon: <ReceiptIcon sx={{ fontSize: 18 }} />, link: '/dashboard/payout-method', roles: [1, 2] },
  { label: 'Logout', icon: <LogoutIcon sx={{ fontSize: 18 }} />, link: '/logout', onClick: null, roles: [1, 2] },
];

const providerSubMenu = [
  { label: 'Network Provider', icon: <ListIcon sx={{ fontSize: 18 }} />, link: '/dashboard/network-provider' },
];

const DashboardSideNav = ({ collapsed, handleToggleCollapse }) => {
  const [localCollapsed, setLocalCollapsed] = useState(collapsed);
  const [openProviders, setOpenProviders] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // get user from context

  const handleToggle = () => {
    setLocalCollapsed(!localCollapsed);
    handleToggleCollapse();
  };

  const userRole = Number(user?.role);

  // Filter nav items based on role
  const navItems = sidebarConfig.filter(item => item.roles.includes(userRole));

  const isActive = (path) => location.pathname === path;

  const handleItemClick = (item) => {
    if (item.isDropdown) {
      setOpenProviders(!openProviders);
    } else if (item.link === '/logout') {
      logout();
    } else {
      navigate(item.link);
      if (!localCollapsed) {
        setLocalCollapsed(true);
        handleToggleCollapse();
      }
    }
  };

  // Avatar text logic
  const avatarText = userRole === 1 ? 'S' : 'A';
  const displayName = userRole === 1 ? 'Super Admin' : 'Admin';

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
      {/* Logo + Collapse */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        {!localCollapsed && <Box sx={{ ml: 1 }}><img src="/Vpaylogo.png" alt="Logo" style={{ width: 80, height: 30 }} /></Box>}
        <IconButton onClick={handleToggle} sx={styles.toggleButton}><ChevronLeftIcon /></IconButton>
      </Box>

      {/* Avatar + Role Name */}
      {!localCollapsed && (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, px: 1, py: 2,
          backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 2, mx: 2, position: 'relative',
        }}>
          <Avatar sx={{
            width: 60, height: 60, mb: 1, border: '2px solid #00FFCC',
            bgcolor: '#02042D', color: '#00FFCC', fontWeight: 600, fontSize: 24
          }}>
            {avatarText}
          </Avatar>
          <Typography variant="subtitle1" color="#fff" sx={{ fontWeight: 600, mt: 1, textAlign: 'center' }}>
            {displayName}
          </Typography>
          <Box sx={{ width: '80%', height: 1, backgroundColor: 'rgba(255,255,255,0.2)', mt: 1 }} />
        </Box>
      )}

      {/* Nav items */}
      <Box sx={styles.navContainer}>
        {navItems.map((item) => (
          <Tooltip title={localCollapsed ? item.label : ''} placement="right" key={item.label}>
            <Box
              sx={{
                ...styles.navItem,
                minHeight: 40,
                height: 40,
                justifyContent: localCollapsed ? 'center' : 'flex-start',
                background: isActive(item.link) ? 'rgba(0,255,204,0.1)' : 'transparent',
                color: isActive(item.link) ? '#00FFCC' : '#B0B3B8',
                boxShadow: isActive(item.link) ? '0 0 8px #00FFCC' : 'none',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': { background: 'rgba(0,255,204,0.1)', color: '#fff' },
              }}
              onClick={() => handleItemClick(item)}
            >
              {isActive(item.link) && <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 4, backgroundColor: '#00FFCC', borderRadius: '0 4px 4px 0' }} />}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: localCollapsed ? 0 : 2, width: '100%', pl: localCollapsed ? 0 : 2 }}>
                {item.icon}
                {!localCollapsed && <span style={styles.navText}>{item.label}</span>}
                {item.isDropdown && !localCollapsed && (openProviders ? <ExpandLessIcon sx={{ fontSize: 18, ml: 'auto' }} /> : <ExpandMoreIcon sx={{ fontSize: 18, ml: 'auto' }} />)}
              </Box>

              {/* Dropdown submenu */}
              {item.isDropdown && openProviders && !localCollapsed && (
                <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column' }}>
                  {providerSubMenu.map((subItem) => (
                    <Box
                      key={subItem.label}
                      sx={{
                        ...styles.navItem,
                        minHeight: 32,
                        background: isActive(subItem.link) ? 'rgba(0,255,204,0.1)' : 'transparent',
                        color: isActive(subItem.link) ? '#00FFCC' : '#B0B3B8',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        '&:hover': { background: 'rgba(0,255,204,0.1)', color: '#fff' },
                      }}
                      onClick={() => navigate(subItem.link)}
                    >
                      {isActive(subItem.link) && <Box sx={{ position: 'absolute', left: 0, top: 0, height: '100%', width: 4, backgroundColor: '#00FFCC', borderRadius: '0 4px 4px 0' }} />}
                      {subItem.icon}
                      <span style={{ marginLeft: 8 }}>{subItem.label}</span>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Drawer>
  );
};

export default DashboardSideNav;
