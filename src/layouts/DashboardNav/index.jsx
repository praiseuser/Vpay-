import { Box } from '@mui/material';
import { dashboardDrawerWidth } from '../../constants/dimensions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import NavRight from '../DashboardNav/NavRight';
import NavLeft from '../DashboardNav/NavLeft';

export default function DashboardNav({ handleDrawerToggle, currentRoute, titleStyle, collapsed }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const displayName = user?.user ? user.user.username : 'Guest';
  const userHandle = user?.user ? `@${user.user.username}` : '@guest';
  const isActive = user?.user?.status === 1;

  const handleToggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleToggleNotification = () => {
    setNotificationOpen((prev) => !prev);
    setMessageOpen(false);
  };
  const handleToggleMessages = () => {
    setMessageOpen((prev) => !prev);
    setNotificationOpen(false);
  };

  return (
    <Box
      sx={{
        ...styles.nav,
        left: { xs: 0, md: collapsed ? '80px' : `${dashboardDrawerWidth}px` },
        width: { xs: '100%', md: collapsed ? `calc(100% - 80px)` : `calc(100% - ${dashboardDrawerWidth}px)` },
      }}
    >
      <NavLeft
        handleDrawerToggle={handleDrawerToggle}
        currentRoute={currentRoute}
        titleStyle={titleStyle}
        userHandle={userHandle}
      />

      <NavRight
        displayName={displayName}
        isActive={isActive}
        userHandle={userHandle}
        dropdownOpen={dropdownOpen}
        notificationOpen={notificationOpen}
        messageOpen={messageOpen}
        handleToggleDropdown={handleToggleDropdown}
        handleToggleNotification={handleToggleNotification}
        handleToggleMessages={handleToggleMessages}
      />
    </Box>
  );
}