import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SidebarNavItem from '../../DashboardSidenav/SidebarNavItem';

const SidebarDropdown = ({
    item,
    collapsed,
    open,
    toggleOpen,
    submenu,
    isActive,
    navigate,
}) => (
    <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: '8px 12px',
                cursor: 'pointer',
                color: '#B0B3B8',
                '&:hover': { background: 'rgba(0,255,204,0.1)', color: '#fff' },
            }}
            onClick={toggleOpen}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 2 }}>
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
            </Box>
            {!collapsed && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </Box>

        {open && !collapsed && (
            <Box sx={{ pl: 4 }}>
                {submenu.map((subItem) => (
                    <SidebarNavItem
                        key={subItem.label}
                        item={subItem}
                        collapsed={collapsed}
                        isActive={isActive(subItem.link)}
                        handleClick={() => navigate(subItem.link)}
                    />
                ))}
            </Box>
        )}
    </>
);

export default SidebarDropdown;
