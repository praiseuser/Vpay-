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
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/Currency" element={<ManageCurrency />} />
          <Route path="/dashboard/Rate" element={<ManageRate />} />
          <Route path="/dashboard/Countries" element={<ManageCountries />} />
          <Route path="/dashboard/Fees" element={<ManageFees />} />
          <Route path="/dashboard/Admin" element={<ManageAdmin />} />
          <Route path="/dashboard/User" element={<ManageUser />} />
          <Route path="/dashboard/add-roles-page" element={<AddRolesPage />} />
          <Route path="/dashboard/add-fiat-page" element={<AddFiatPage />} />
          <Route path="/dashboard/add-Crypto-page" element={<AddCryptoPage />} />
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/profile-page" element={<ProfilePage />} />
          <Route path="/dashboard/settings-page" element={<SettingsPage />} />

        </Routes>
      </DashboardLayout>
    </>
  );
};

export default DashboardRoutes;
