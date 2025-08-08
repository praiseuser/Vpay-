const navItems = [
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
    { label: 'logout', icon: <LogoutIcon sx={{ fontSize: 18 }} />, link: '/logout', onClick: logout },
  ];

  const providerSubMenu = [
    { label: 'List Providers', icon: <ListIcon sx={{ fontSize: 18 }} />, link: '/manage-providers/list' },
    { label: 'Add Provider', icon: <AddIcon sx={{ fontSize: 18 }} />, link: '/manage-providers/add' },
  ];