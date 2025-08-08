import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SidebarHeader = ({ collapsed, handleToggle }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
    {!collapsed && (
      <Box sx={{ ml: 2 }}>
        <img src="/image 5.png" alt="Logo" style={{ width: 40, height: 40 }} />
      </Box>
    )}
    <IconButton onClick={handleToggle} sx={{ marginLeft: 'auto' }}>
      <ChevronLeftIcon />
    </IconButton>
  </Box>
);

export default SidebarHeader;
