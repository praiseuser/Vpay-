import { Box, CircularProgress } from '@mui/material';

const SidebarNavItem = ({ item, collapsed, isActive, handleClick, loading }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 2,
            padding: '8px 12px',
            background: isActive ? 'rgba(0,255,204,0.2)' : 'transparent',
            color: isActive ? '#00FFCC' : '#B0B3B8',
            cursor: 'pointer',
            '&:hover': { background: 'rgba(0,255,204,0.1)', color: '#fff' },
        }}
        onClick={handleClick}
    >
        {item.icon}
        {!collapsed && <span>{item.label}</span>}
        {loading && item.isLogout && <CircularProgress size={16} sx={{ color: '#fff', ml: 1 }} />}
    </Box>
);

export default SidebarNavItem;
