import { Box, Collapse } from '@mui/material';
import DashboardNavigLink from '../../DashboardNavLink';
import MenuIcon from '@mui/icons-material/Menu';
import { getIconForNav } from '../../Library'; // Import getIconForNav

const SubNav = ({ subNav, collapsed, location, styles, subNavTextStyleExport, openSubNav, item }) => (
  <Collapse in={openSubNav[item.label] && !collapsed} unmountOnExit>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1, pl: 2, pr: 0 }}>
      {subNav.map((subItem, subIndex) => {
        const isSubActive = location.pathname === subItem.link;
        return (
          <DashboardNavigLink
            key={subIndex}
            to={subItem.link}
            isactive={isSubActive ? 1 : 0}
            collapsed={collapsed}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: collapsed ? 1 : 1.5,
              borderRadius: 12,
              minHeight: 44,
              height: 44,
              color: isSubActive ? '#fff' : '#B0B3B8',
              backgroundColor: isSubActive ? '#208BC9' : 'transparent',
              border: isSubActive ? '1px solid rgba(32, 139, 201, 0.5)' : 'transparent',
              justifyContent: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                width: '100%',
                minWidth: 48,
                height: 40,
              }}
            >
              <Box sx={{ ...styles.navIcon, width: 20, height: 20 }}>
                {getIconForNav(subItem, { color: 'currentColor', fontSize: 18 }) || <MenuIcon sx={{ color: 'currentColor', fontSize: 18 }} />}
              </Box>
              <span style={{ ...subNavTextStyleExport, fontSize: '13px', color: 'currentColor', fontWeight: 500 }}>{subItem.label}</span>
            </Box>
          </DashboardNavigLink>
        );
      })}
    </Box>
  </Collapse>
);

export default SubNav;