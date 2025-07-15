import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import RouterIcon from '@mui/icons-material/Router';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

export const drawerWidth = 260;
export const layoutPad = 22;
export const navHeight = 80;

export const logoLayoutProps = {
  direction: 'row',
  alignItems: 'center',
  gap: 0.5,
};

const iconStyle = {};

const navTextStyle = {
  fontFamily: 'Mada',
  fontWeight: 600,
  fontSize: '15px',
  lineHeight: '120%',
  letterSpacing: '0%',
  color: '#D9D9D9',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  cursor: 'pointer',
};

const subNavTextStyle = {
  ...navTextStyle,
  fontSize: '13px',
};

const logoutTextStyle = {
  ...navTextStyle,
  fontSize: '13px',
};

export const mainNavList = [
  { label: 'Dashboard', link: '/dashboard', subNav: [] },
  { label: 'Manage User', link: '/dashboard/user', subNav: [] },
  { label: 'Manage Admin', link: '/dashboard/Admin', subNav: [] },
  { label: 'Manage Fees', link: '/dashboard/Fees', subNav: [] },
  { label: 'Manage Rate', link: '/dashboard/Rate', subNav: [] },
  { label: 'Manage Countries', link: '/dashboard/countries', subNav: [] },
  { label: 'Manage Currency', link: '/dashboard/Currency', subNav: [] },
  {
    label: 'Manage Providers',
    subNav: [
      { label: 'Network Provider', link: 'dashboard/network-provider' },
      { label: 'Bills Provider', link: 'dashboard/bill-provider' },
      { label: 'Betting Provider', link: 'dashboard/betting-provider' },
    ],
  },
  { label: 'Card', link: '/dashboard/card', subNav: [] },
  { label: 'Transaction', link: '/dashboard/transaction', subNav: [] },
  { label: 'Support', link: '/dashboard/support', subNav: [] },
  { label: 'Profile', link: '/dashboard/profile', subNav: [] },
  { label: 'Settings', link: '/dashboard/settings', subNav: [] },
];

export const bottomNavList = [
  { label: 'Logout', link: null, subNav: [] },
];

export const getIconForNav = (item, props = {}) => {
  const style = { ...iconStyle, ...props };
  
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
    case 'Manage Providers':
      return <MiscellaneousServicesIcon style={style} />;
    case 'Network Provider':
      return <RouterIcon style={style} />;
    case 'Bills Provider':
      return <ReceiptIcon style={style} />;
    case 'Betting Provider':
      return <SportsEsportsIcon style={style} />;
    case 'Card':
      return <CreditCardIcon style={style} />;
    case 'Transaction':
      return <PaymentIcon style={style} />;
    case 'Support':
      return <SupportAgentIcon style={style} />;
    case 'Profile':
      return <AccountCircleIcon style={style} />;
    case 'Settings':
      return <SettingsIcon style={style} />;
    case 'Logout':
      return <ExitToAppIcon style={style} />;
    default:
      return <DashboardRoundedIcon style={style} />;
  }
};

export const navTextStyleExport = navTextStyle;
export const subNavTextStyleExport = subNavTextStyle;
export const logoutTextStyleExport = logoutTextStyle;