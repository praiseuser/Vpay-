import { Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getIconForNav } from '../../Library';

const BottomNav = ({ bottomNavList, logout, loading, collapsed, styles, logoutTextStyleExport }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderTop: '1px solid rgba(32, 139, 201, 0.3)',
        pt: 2
    }}
    >
        {bottomNavList.map((item, index) => (
            <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                p: collapsed ? 1 : 1.5,
                borderRadius: 2,
                minHeight: 48,
                height: 48,
                color: '#B0B3B8',
                cursor: 'pointer'
            }} onClick={logout}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1.5, width: '100%', minWidth: collapsed ? 48 : 'auto', height: 48 }}>
                    <Box sx={{ ...styles.navIcon, width: 24, height: 24 }}>
                        {getIconForNav(item, { color: 'currentColor', fontSize: 22 }) || <MenuIcon sx={{ color: 'currentColor', fontSize: 22 }} />}
                    </Box>
                    {!collapsed && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ ...logoutTextStyleExport, fontSize: '14px', color: 'currentColor', fontWeight: 600 }}>{item.label}</span>
                            {loading && <CircularProgress size={16} sx={{ color: 'currentColor' }} />}
                        </Box>
                    )}
                </Box>
                {collapsed && <Box sx={{ ...styles.tooltip, backgroundColor: '#02042D', border: '1px solid rgba(244, 67, 54, 0.4)', borderRadius: 12, p: 1, fontSize: '12px' }} className="nav-tooltip">{item.label}</Box>}
            </Box>
        ))}
    </Box>
);

export default BottomNav;