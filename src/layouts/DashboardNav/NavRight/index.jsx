import { Box, Badge, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import NetworkSwitch from '../../../components/NetworkSwitch';
import { styles } from '../styles';

export default function NavRight({ displayName, isActive }) {
  return (
    <Box sx={styles.container}>
      <Box sx={{ ...styles.navRight, display: { xs: 'none', md: 'flex' }, alignItems: 'center', opacity: 1 }}>
        <Box sx={{ ...styles.searchBox, display: { xs: 'none', md: 'flex' }, opacity: 1 }}>
          <SearchIcon sx={styles.searchIcon} />
          <InputBase
            placeholder="Search. . . . ."
            fullWidth
            sx={styles.searchInput}
          />
        </Box>
        <NetworkSwitch sx={{ display: { xs: 'none', md: 'flex' } }} />

        <Box sx={{ position: 'relative', display: { xs: 'none', md: 'flex' } }}>
          <Box
            sx={{
              ...styles.userInfo,
              display: 'flex',
              alignItems: 'center',
              opacity: 1,
              visibility: 'visible',
              zIndex: 1200,
            }}
          >
            <Box sx={{ ...styles.userAvatar, backgroundColor: 'whitesmoke' }}>
              <Typography sx={styles.userAvatarText}>
                {displayName.charAt(0).toUpperCase()}
              </Typography>
              {isActive && <Box sx={styles.activeIndicator} />}
            </Box>
            <Box sx={styles.userDetails}>
              <Typography sx={styles.userName}>{displayName}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}