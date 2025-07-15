import { Box, Badge, Typography, InputBase } from '@mui/material';
import {
  Search as SearchIcon,
  NotificationsNone as NotificationsNoneIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NetworkSwitch from '../../../components/NetworkSwitch';
import { styles } from '../styles';

export default function NavRight({
  displayName,
  userHandle,
  isActive,
  dropdownOpen,
  notificationOpen,
  messageOpen,
  handleToggleDropdown,
  handleToggleNotification,
  handleToggleMessages,
}) {
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.navRight, display: 'flex', alignItems: 'center', opacity: 1 }}>
        <Box sx={{ ...styles.searchBox, display: { xs: 'none', md: 'flex' }, opacity: 1 }}>
          <SearchIcon sx={styles.searchIcon} />
          <InputBase
            placeholder="Search"
            fullWidth
            sx={styles.searchInput}
          />
        </Box>

        <NetworkSwitch sx={{ display: { xs: 'block', md: 'flex' } }} />

        <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ ...styles.iconBox, opacity: 1, visibility: 'visible' }}>
            <Badge
              badgeContent={3}
              color="primary"
              sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: '16px', minWidth: '16px', padding: '0 2px' } }}
            >
              <NotificationsNoneIcon
                sx={styles.iconSize}
                onClick={handleToggleNotification}
              />
            </Badge>
          </Box>
          {notificationOpen && (
            <Box sx={styles.notificationDropdown}>
            </Box>
          )}
        </Box>

        <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ ...styles.iconBox, opacity: 1, visibility: 'visible' }}>
            <Badge
              badgeContent={5}
              color="primary"
              sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: '16px', minWidth: '16px', padding: '0 4px' } }}
            >
              <MessageIcon
                sx={styles.iconSize}
                onClick={handleToggleMessages}
              />
            </Badge>
          </Box>
          {messageOpen && (
            <Box sx={styles.notificationDropdown}>
            </Box>
          )}
        </Box>

        <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              ...styles.userInfo,
              display: 'flex',
              alignItems: 'center',
              opacity: 1,
              visibility: 'visible',
              zIndex: 1200,
            }}
            onClick={handleToggleDropdown}
          >
            <Box sx={styles.userAvatar}>
              <Typography sx={styles.userAvatarText}>
                {displayName.charAt(0).toUpperCase()}
              </Typography>
              {isActive && <Box sx={styles.activeIndicator} />}
            </Box>
            <Box sx={styles.userDetails}>
              <Typography sx={styles.userName}>{displayName}</Typography>
            </Box>
          </Box>

          {dropdownOpen && (
            <Box sx={styles.dropdownMenu}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography sx={styles.dropdownItem}>Login</Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}