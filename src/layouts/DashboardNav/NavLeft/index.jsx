import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styles } from '../styles';

export default function NavLeft({ handleDrawerToggle, currentRoute, titleStyle, userHandle }) {
  return (
    <Box sx={styles.navLeft}>
      <IconButton
        sx={{
          display: { xs: 'block', md: 'none' },
          color: '#0C0B18',
          opacity: 1,
          visibility: 'visible',
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: { md: 'flex-start' } }}>
        <Typography sx={{ ...styles.navTitle, ...titleStyle, marginBottom: { md: 1 } }}>
          {currentRoute}
        </Typography>
        <Typography sx={styles.userHandleText}>
          {userHandle}
        </Typography>
      </Box>
    </Box>
  );
}