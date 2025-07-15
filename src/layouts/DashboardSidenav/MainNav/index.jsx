import { Box, Collapse } from '@mui/material';
import DashboardNavigLink from '../../DashboardNavLink';
import SubNav from '../../DashboardSidenav/SubNav';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { getIconForNav } from '../../Library';

const MainNav = ({ mainNavList, isActive, openSubNav, handleSubNavToggle, collapsed, location, styles, navTextStyleExport, subNavTextStyleExport }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
    {mainNavList.map((item, index) => {
      const isActiveItem = isActive(item.link, item.subNav);
      const navItemStyles = {
        display: 'flex',
        alignItems: 'center',
        p: collapsed ? 1 : 1.5,
        borderRadius: 2,
        minHeight: 48,
        height: 48,
        color: isActiveItem || openSubNav[item.label] ? '#fff' : '#B0B3B8',
        backgroundColor: isActiveItem || openSubNav[item.label] ? '#208BC9' : 'transparent',
        border: isActiveItem || openSubNav[item.label] ? '1px solid rgba(32, 139, 201, 0.4)' : 'transparent',
        justifyContent: collapsed ? 'center' : 'flex-start',
      };
      if (item.subNav && item.subNav.length > 0) {
        return (
          <Box key={index}>
            <Box sx={{ ...navItemStyles, cursor: 'pointer' }} onClick={() => handleSubNavToggle(item.label)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1.5, width: '100%', minWidth: collapsed ? 48 : 'auto', height: 48 }}>
                <Box sx={{ ...styles.navIcon, width: 24, height: 24 }}>
                  {getIconForNav(item, { color: 'currentColor', fontSize: 22 }) || <MenuIcon sx={{ color: 'currentColor', fontSize: 22 }} />}
                </Box>
                {!collapsed && (
                  <>
                    <Box sx={{ flex: 1 }}><span style={{ ...navTextStyleExport, fontSize: '14px', color: 'currentColor', fontWeight: 600 }}>{item.label}</span></Box>
                    <ExpandMore sx={{ color: 'currentColor', fontSize: 20, ml: 'auto' }} />
                  </>
                )}
              </Box>
              {collapsed && item.label !== 'Manage Providers' && <Box sx={{ ...styles.tooltip, backgroundColor: '#02042D', border: '1px solid rgba(32, 139, 201, 0.4)', borderRadius: 12, p: 1, fontSize: '12px' }} className="nav-tooltip">{item.label}</Box>}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SubNav
                subNav={item.subNav}
                collapsed={collapsed}
                location={location}
                styles={styles}
                subNavTextStyleExport={subNavTextStyleExport}
                openSubNav={openSubNav}
                item={item}
              />
            </Box>
          </Box>
        );
      }
      return (
        <DashboardNavigLink key={index} to={item.link} isactive={isActiveItem ? 1 : 0} collapsed={collapsed} sx={navItemStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1.5, width: '100%', minWidth: collapsed ? 48 : 'auto', height: 48 }}>
            <Box sx={{ ...styles.navIcon, width: 24, height: 24 }}>
              {getIconForNav(item, { color: 'currentColor', fontSize: 22 }) || <MenuIcon sx={{ color: 'currentColor', fontSize: 22 }} />}
            </Box>
            {!collapsed && <span style={{ ...navTextStyleExport, fontSize: '14px', color: 'currentColor', fontWeight: 600 }}>{item.label}</span>}
          </Box>
          {collapsed && <Box sx={{ ...styles.tooltip, backgroundColor: '#02042D', border: '1px solid rgba(32, 139, 201, 0.4)', borderRadius: 12, p: 1, fontSize: '12px' }} className="nav-tooltip">{item.label}</Box>}
        </DashboardNavigLink>
      );
    })}
  </Box>
);

export default MainNav;