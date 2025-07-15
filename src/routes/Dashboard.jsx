import { Routes, Route } from "react-router-dom";
import {
  DashboardHome,
  ManageAdmin,
  ManageCountries,
  ManageCurrency,
  ManageFees,
  ManageRate,
  ManageUser,
  AddFiatPage,
  AddCryptoPage,
  User,
  ProfilePage,
  SettingsPage,
} from "../pages/Dashboard";
import { DashboardLayout } from "../layouts";
import NetworkProvider from "../pages/Dashboard/NetworkProvider";
import BillProvider from "../pages/Dashboard/BIllProvider";
import BettingProvider from "../pages/Dashboard/BettingProvider";
import Card from "../pages/Dashboard/Card";
import Transaction from "../pages/Dashboard/Transaction";
import Support from "../pages/Dashboard/Support";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/currency" element={<ManageCurrency />} />
        <Route path="/dashboard/rate" element={<ManageRate />} />
        <Route path="/dashboard/countries" element={<ManageCountries />} />
        <Route path="/dashboard/fees" element={<ManageFees />} />
        <Route path="/dashboard/admin" element={<ManageAdmin />} />
        <Route path="/dashboard/user" element={<ManageUser />} />
        <Route path="/dashboard/add-fiat" element={<AddFiatPage />} />
        <Route path="/dashboard/add-crypto" element={<AddCryptoPage />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/network-provider" element={<NetworkProvider />} />
        <Route path="/dashboard/bill-provider" element={<BillProvider />} />
        <Route path="/dashboard/betting-provider" element={<BettingProvider />} />
        <Route path="/dashboard/card" element={<Card />} />
        <Route path="/dashboard/transaction" element={<Transaction />} />
        <Route path="/dashboard/support" element={<Support />} />
      </Routes> 
    </DashboardLayout>
  );
};

export default DashboardRoutes;
