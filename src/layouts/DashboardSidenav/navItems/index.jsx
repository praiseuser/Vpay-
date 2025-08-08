// components/DashboardSideNav/navItems.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PublicIcon from '@mui/icons-material/Public';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportIcon from '@mui/icons-material/Support';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';

export const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} />, link: '/dashboard' },
  { label: 'ManageUser', icon: <PeopleIcon sx={{ fontSize: 18 }} />, link: '/dashboard/user' },
  { label: 'ManageFees', icon: <AttachMoneyIcon sx={{ fontSize: 18 }} />, link: '/dashboard/fees' },
  { label: 'ManageRate', icon: <RateReviewIcon sx={{ fontSize: 18 }} />, link: '/dashboard/rate' },
  { label: 'ManageCountries', icon: <PublicIcon sx={{ fontSize: 18 }} />, link: '/dashboard/countries' },
  { label: 'ManageCurrency', icon: <CurrencyExchangeIcon sx={{ fontSize: 18 }} />, link: '/dashboard/currency' },
  { label: 'ManageProviders', icon: <BusinessIcon sx={{ fontSize: 18 }} />, isDropdown: true },
  { label: 'Card', icon: <CreditCardIcon sx={{ fontSize: 18 }} />, link: '/dashboard/card' },
  { label: 'Transaction', icon: <ReceiptIcon sx={{ fontSize: 18 }} />, link: '/dashboard/transaction' },
  { label: 'Support', icon: <SupportIcon sx={{ fontSize: 18 }} />, link: '/dashboard/support' },
  { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 18 }} />, link: '/dashboard/profile' },
  { label: 'Settings', icon: <SettingsIcon sx={{ fontSize: 18 }} />, link: '/dashboard/settings' },
  { label: 'logout', icon: <LogoutIcon sx={{ fontSize: 18 }} />, link: '/logout', isLogout: true },
];

export const providerSubMenu = [
  { label: 'Network Provider', icon: <ListIcon sx={{ fontSize: 18 }} />, link: '/dashboard/network-provider' },
];
