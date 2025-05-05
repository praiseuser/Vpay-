import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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

export const navList = [
  { label: 'Dashboard', link: '/dashboard', subNav: [] },
  { label: 'Manage User', link: '/dashboard/User', subNav: [] },
  { label: 'Manage Admin', link: '/dashboard/Admin', subNav: [] },
  { label: 'Manage Fees', link: '/dashboard/Fees', subNav: [] },
  { label: 'Manage Rate', link: '/dashboard/Rate', subNav: [] },
  { label: 'Manage Countries', link: '/dashboard/countries', subNav: [] },
  { label: 'Manage Currency', link: '/dashboard/Currency', subNav: [] },
];

export const getIconForNav = (item) => {
  switch (item.label) {
    case 'Dashboard':
      return <DashboardRoundedIcon style={iconStyle} />;
    case 'Manage User':
      return <PeopleIcon style={iconStyle} />;
    case 'Manage Admin':
      return <AdminPanelSettingsIcon style={iconStyle} />;
    case 'Manage Fees':
      return <AccountBalanceIcon style={iconStyle} />;
    case 'Manage Rate':
      return <CurrencyExchangeIcon style={iconStyle} />;
    case 'Manage Countries':
      return <PublicIcon style={iconStyle} />;
    case 'Manage Currency':
      return <MonetizationOnIcon style={iconStyle} />;
    default:
      return <DashboardRoundedIcon style={iconStyle} />; 
  }
};

export const navTextStyleExport = navTextStyle;