import { Box, Tooltip, CircularProgress } from '@mui/material';
import { styles } from '../styles';

const DashboardNavLink = ({ item, isActive, localCollapsed, dropdownOpen, handleDropdownToggle, handleItemClick, loading }) => {
  return (
    <Tooltip title={localCollapsed ? item.label : ''} placement="right">
      <Box
        sx={{
          ...styles.navItem,
          justifyContent: localCollapsed ? 'center' : 'flex-start',
          background: isActive ? styles.navItem.active.background : 'transparent',
          color: isActive ? '#00FFCC' : '#B0B3B8',
          boxShadow: isActive ? styles.navItem.active.shadow : 'none',
          '&:hover': {
            background: isActive ? styles.navItem.active.hover : 'rgba(0, 255, 204, 0.1)',
            color: '#fff',
          },
          animation: isActive ? 'none' : 'slideRotate 0.5s ease-out',
        }}
        onClick={() => (item.dropdown ? handleDropdownToggle() : handleItemClick(item))}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: localCollapsed ? 0 : 2, position: 'relative' }}>
          {item.icon}
          {!localCollapsed && (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={styles.navText}>{item.label}</span>
              {item.dropdown && dropdownOpen && (
                <Box sx={{ pl: 2, color: '#B0B3B8', fontSize: '0.9rem', ml: '-4px' }}>
                  {item.content}
                </Box>
              )}
            </Box>
          )}
          {loading && item.label === 'logout' && <CircularProgress size={16} sx={{ color: '#fff', ml: 1 }} />}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default DashboardNavLink;