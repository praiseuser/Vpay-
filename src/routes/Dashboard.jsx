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
        <Route path="/dasboard" element={<DashboardHome />} /> 
        <Route path="/Currency" element={<ManageCurrency />} />
        <Route path="/Rate" element={<ManageRate />} />
        <Route path="/Countries" element={<ManageCountries />} />
        <Route path="/Fees" element={<ManageFees />} />
        <Route path="/Admin" element={<ManageAdmin />} />
        <Route path="/User" element={<ManageUser />} />
        <Route path="/add-roles-page" element={<AddRolesPage />} />
        <Route path="/add-fiat-page" element={<AddFiatPage />} />
        <Route path="/add-Crypto-page" element={<AddCryptoPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/settings-page" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;