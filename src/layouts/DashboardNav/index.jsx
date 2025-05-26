import { Box, IconButton, Typography, InputBase } from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsNoneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { styles } from './styles';
import { dashboardDrawerWidth } from '../../constants/dimensions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashboardNav({ handleDrawerToggle, currentRoute, mobileOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const user = useSelector((state) => state.user);

  const handleToggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleToggleNotification = () => {
    setNotificationOpen(prev => !prev);
  };

  const displayName = user?.user ? user.user.username : 'Gracetrans';
  const userHandle = user?.user ? `@${user.user.username}` : '@gracetrans';
  const isActive = user?.user?.status === 1; 

  return (
    <Box
      position="fixed"
      sx={{
        ...styles.nav,
        ml: { xs: mobileOpen ? `${dashboardDrawerWidth}px` : '0px', md: `${dashboardDrawerWidth}px` },
        transition: 'margin-left 0.3s',
      }}
    >
      <Box sx={styles.navLeft}>
        <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography sx={styles.navTitle}>{currentRoute}</Typography>
      </Box>

      <Box sx={styles.contanier}>
        <Box sx={styles.navRight}>
          <Box sx={styles.searchBox}>
            <SearchIcon sx={styles.searchIcon} />
            <InputBase placeholder="Search" fullWidth sx={styles.searchInput} />
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box sx={styles.notificationIcon} onClick={handleToggleNotification}>
              <NotificationsNoneIcon sx={styles.iconSize} />
            </Box>

            {notificationOpen && (
              <Box sx={styles.notificationDropdown}>
                <Typography sx={styles.dropdownItem}>New user registered</Typography>
                <Typography sx={styles.dropdownItem}>New message from admin</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box sx={styles.userInfo} onClick={handleToggleDropdown}>
              <Typography sx={styles.welcomeMessage}>Welcome back,</Typography>
              <Box sx={{ position: 'relative' }}>
                <Box sx={styles.userAvatar}>
                  <Typography sx={{ ...styles.userAvatarText, color: 'white' }}>
                    {user?.user?.username ? user.user.username.charAt(0).toUpperCase() : 'G'}
                  </Typography>
                </Box>
                {isActive && <Box sx={styles.activeIndicator} />}
              </Box>
              <Box sx={styles.userDetails}>
                <Typography sx={styles.userName}>{displayName}</Typography>
                <Typography sx={styles.userHandle}>{userHandle}</Typography>
              </Box>
              <KeyboardArrowDownIcon sx={styles.arrowIcon} />
            </Box>

            {dropdownOpen && (
              <Box sx={styles.dropdownMenu}>
                <Link to="/dashboard/profile" style={{ textDecoration: 'none' }}>
                  <Typography sx={styles.dropdownItem}>Profile</Typography>
                </Link>
                <Link to="/dashboard/settings" style={{ textDecoration: 'none' }}>
                  <Typography sx={styles.dropdownItem}>Settings</Typography>
                </Link>
                <Typography sx={styles.dropdownItem}>Logout</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}