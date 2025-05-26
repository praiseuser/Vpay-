import { Routes, Route } from "react-router-dom";
import {
  DashboardHome,
  ManageAdmin,
  ManageCountries,
  ManageCurrency,
  ManageFees,
  ManageRate,
  ManageUser,
  AddRolesPage,
  AddFiatPage,
  AddCryptoPage,
  User,
  ProfilePage,
  SettingsPage,
} from "../pages/Dashboard";
import { DashboardLayout } from "../layouts";

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
        <Route path="/dashboard/add-roles" element={<AddRolesPage />} />
        <Route path="/dashboard/add-fiat" element={<AddFiatPage />} />
        <Route path="/dashboard/add-crypto" element={<AddCryptoPage />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
