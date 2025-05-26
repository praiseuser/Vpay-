import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const drawerWidth = 260;
export const layoutPad = 22;
export const navHeight = 80;

export const logoLayoutProps = {
  direction: 'row',
  alignItems: 'center',
  gap: 0.5,
};

const iconStyle = {
  width: '24px',
  height: '24px',
};

const navTextStyle = {
  fontFamily: 'Mada',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '120%',
  letterSpacing: '0%',
  color: '#D9D9D9',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  cursor: 'pointer',
};

const logoutTextStyle = {
  ...navTextStyle,
  fontSize: '14px',
};

export const mainNavList = [
  { label: 'Dashboard', link: '/dashboard', subNav: [] },
  { label: 'Manage User', link: '/dashboard/user', subNav: [] },
  { label: 'Manage Admin', link: '/dashboard/Admin', subNav: [] },
  { label: 'Manage Fees', link: '/dashboard/Fees', subNav: [] },
  { label: 'Manage Rate', link: '/dashboard/Rate', subNav: [] },
  { label: 'Manage Countries', link: '/dashboard/countries', subNav: [] },
  { label: 'Manage Currency', link: '/dashboard/Currency', subNav: [] },
];

export const bottomNavList = [
  { label: 'Logout', link: null, subNav: [] },
];

export const getIconForNav = (item) => {
  const style = item.label === 'Logout' ? { ...iconStyle, width: '18px', height: '18px' } : iconStyle;
  switch (item.label) {
    case 'Dashboard':
      return <DashboardRoundedIcon style={style} />;
    case 'Manage User':
      return <PeopleIcon style={style} />;
    case 'Manage Admin':
      return <AdminPanelSettingsIcon style={style} />;
    case 'Manage Fees':
      return <AccountBalanceIcon style={style} />;
    case 'Manage Rate':
      return <CurrencyExchangeIcon style={style} />;
    case 'Manage Countries':
      return <PublicIcon style={style} />;
    case 'Manage Currency':
      return <MonetizationOnIcon style={style} />;
    case 'Logout':
      return <ExitToAppIcon style={style} />;
    default:
      return <DashboardRoundedIcon style={style} />;
  }
};

export const navTextStyleExport = navTextStyle;
export const logoutTextStyleExport = logoutTextStyle;