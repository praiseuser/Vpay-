import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupportIcon from "@mui/icons-material/Support";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CreditCardIcon from "@mui/icons-material/CreditCard"; 
import VpnKeyIcon from "@mui/icons-material/VpnKey"; 

const idToName = {
  1: "USERS",
  2: "COUNTRIES",
  3: "CURRENCY",
  4: "RATES",
  5: "SUPPORT",
  6: "BLOG",
};

const normalizeSubRoles = (subRoles) => {
  if (!subRoles) return new Set();

  const names = subRoles
    .map((r) => {
      if (typeof r === "string") return r.toUpperCase();
      if (typeof r === "number")
        return (idToName[r] || String(r)).toUpperCase();
      if (typeof r === "object" && r !== null) {
        if (r.admin_type) return String(r.admin_type).toUpperCase();
        if (r.name) return String(r.name).toUpperCase();
        if (r.type) return String(r.type).toUpperCase();
        if (r.id) return (idToName[r.id] || String(r.id)).toUpperCase();
      }
      try {
        return String(r).toUpperCase();
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return new Set(names);
};

const hasAny = (roleSet, ...variants) =>
  variants.some((v) => roleSet.has(v.toUpperCase()));

export const getNav = (role, subRoles) => {
  const isSuperAdmin = role === 1;
  const roleSet = normalizeSubRoles(subRoles);

  return [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    (isSuperAdmin || hasAny(roleSet, "TRANSACTION", "TRANSACTIONS")) && {
      label: "Transaction",
      path: "/dashboard/transaction",
      icon: <ReceiptIcon />,
    },
    (isSuperAdmin || roleSet.has("SUPPORT")) && {
      label: "Support",
      path: "/dashboard/support",
      icon: <SupportIcon />,
    },
    (isSuperAdmin || hasAny(roleSet, "FEES", "MANAGE FEES")) && {
      label: "Manage Fees",
      path: "/dashboard/fees",
      icon: <AttachMoneyIcon />,
    },
    (isSuperAdmin || hasAny(roleSet, "RATES", "RATE")) && {
      label: "Manage Rate",
      path: "/dashboard/rate",
      icon: <RateReviewIcon />,
    },
    (isSuperAdmin || roleSet.has("CURRENCY")) && {
      label: "Manage Currency",
      path: "/dashboard/currency",
      icon: <CurrencyExchangeIcon />,
    },
    (isSuperAdmin || roleSet.has("COUNTRIES")) && {
      label: "Manage Countries",
      path: "/dashboard/countries",
      icon: <PublicIcon />,
    },
    (isSuperAdmin || roleSet.has("BLOG")) && {
      label: "Manage Blog",
      path: "/dashboard/blog",
      icon: <RateReviewIcon />,
    },
    (isSuperAdmin || roleSet.has("CARD")) && {
      label: "Manage Card",
      path: "/dashboard/card",
      icon: <CreditCardIcon />, 
    },
    isSuperAdmin && {
      label: "Manage Admin",
      path: "/dashboard/admin",
      icon: <PeopleIcon />,
    },
    (isSuperAdmin || roleSet.has("NETWORK_PROVIDER")) && {
      label: "Network Provider",
      icon: <PublicIcon />,
      dropdown: [
        (isSuperAdmin || roleSet.has("NETWORK_PROVIDER")) && {
          label: "Network Provider",
          path: "/dashboard/network-provider",
        },
        (isSuperAdmin || roleSet.has("BILL_PROVIDER")) && {
          label: "Bill Provider",
          path: "/dashboard/bill-provider",
        },
        (isSuperAdmin || roleSet.has("BETTING_PROVIDER")) && {
          label: "Betting Provider",
          path: "/dashboard/betting-provider",
        },
      ].filter(Boolean),
    },
    {
      label: "Account Password",
      path: "/dashboard/account-password",
      icon: <VpnKeyIcon />
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <SettingsIcon />
    },
    {
      label: "Logout",
      path: "/logout",
      icon: <LogoutIcon />
    },
  ].filter(Boolean);
};
