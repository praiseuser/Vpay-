import { Box, Stack, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logoLayoutProps } from '../../Library';
import { styles } from '../styles';

const Header = ({ collapsed, handleToggleCollapse, isSmallScreen, onClose }) => (
  <Box sx={{ ...styles.header, backgroundColor: '#02042D' }}>
    <Stack {...logoLayoutProps} direction="row" alignItems="center" sx={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start', mt: 1.5 }}>
      <IconButton
        onClick={handleToggleCollapse}
        sx={{
          ...styles.toggleButton,
          ...(collapsed && { mx: 'auto' }),
          backgroundColor: '#02042D',
          border: '1px solid rgba(32, 139, 201, 0.4)',
          borderRadius: '12px',
        }}
      >
        <MenuIcon sx={{ color: '#fff' }} />
      </IconButton>
      {!collapsed && <Box component="img" src="Vpaylogo.png" alt="Logo" sx={{ width: 80, height: 30, ml: 5, mt: 1 }} />}
    </Stack>
    {isSmallScreen && (
      <IconButton onClick={onClose} sx={{ color: '#fff' }}>
        <MenuIcon />
      </IconButton>
    )}
  </Box>
);

export default Header;