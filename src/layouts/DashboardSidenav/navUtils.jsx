import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PublicIcon from "@mui/icons-material/Public";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CategoryIcon from "@mui/icons-material/Category";
import FeedIcon from "@mui/icons-material/Feed";
import HelpIcon from "@mui/icons-material/Help";
import LanguageIcon from "@mui/icons-material/Language";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import StoreIcon from "@mui/icons-material/Store";
import LanIcon from "@mui/icons-material/Lan"; // ✅ Web3 parent icon

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
      label: "Transactions",
      path: "/dashboard/transaction",
      icon: <ReceiptLongIcon />,
    },

    (isSuperAdmin || roleSet.has("SUPPORT")) && {
      label: "Support",
      path: "/dashboard/support",
      icon: <SupportAgentIcon />,
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
      icon: <LanguageIcon />,
    },

    (isSuperAdmin || roleSet.has("BLOG")) && {
      label: "Manage Blog",
      path: "/dashboard/blog",
      icon: <FeedIcon />,
    },

    (isSuperAdmin || roleSet.has("BLOG CATEGORY")) && {
      label: "Blog Category",
      path: "/dashboard/blog-category",
      icon: <CategoryIcon />,
    },

    (isSuperAdmin || roleSet.has("FAQ")) && {
      label: "FAQ",
      path: "/dashboard/faq",
      icon: <HelpIcon />,
    },

    (isSuperAdmin || roleSet.has("PROVIDER CATEGORY")) && {
      label: "Provider Category",
      path: "/dashboard/provider-category",
      icon: <WorkspacesIcon />,
    },

    (isSuperAdmin || roleSet.has("PROVIDER")) && {
      label: "Provider",
      path: "/dashboard/provider",
      icon: <StoreIcon />,
    },

    (isSuperAdmin || roleSet.has("CARD")) && {
      label: "Manage Card",
      path: "/dashboard/card",
      icon: <CreditCardIcon />,
    },
    (isSuperAdmin || roleSet.has("USER")) && {
      label: "User",
      path: "/dashboard/user",
      icon: <CreditCardIcon />,
    },

    isSuperAdmin && {
      label: "Manage Admin",
      path: "/dashboard/admin",
      icon: <PeopleIcon />,
    },

    (isSuperAdmin || hasAny(roleSet, "WEB3", "CONTRACT FEES", "CONTRACT TOKEN TYPES")) && {
      label: "Web3",
      icon: <LanIcon />,
      children: [
        {
          label: "Contract Fees",
          path: "/dashboard/contract-fees",
          icon: <AttachMoneyIcon />,
        },
        {
          label: "Contract Token Types",
          path: "/dashboard/contract-token-types",
          icon: <CurrencyExchangeIcon />,
        },
      ],
    },

    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <SettingsIcon />,
    },
    {
      label: "Account Password",
      path: "/dashboard/account-password",
      icon: <VpnKeyIcon />,
    },

    {
      label: "Logout",
      path: "/logout",
      icon: <LogoutIcon />,
    },
  ].filter(Boolean);
};
