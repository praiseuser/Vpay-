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
import AccountPassword from "../pages/Dashboard/AccountPassword";
import ProtectedRoute from "../ProtectedRoute";
import DetailsPage from "../pages/Dashboard/DetailsPage";
import BlogPage from "../pages/Dashboard/Blog/BlogPage"; 
import CategoryPage from "../pages/Dashboard/BlogCategory/CategoryPage";
import ProviderPage from "../pages/Dashboard/ProviderCategory/ProviderPage";
import FaqPage from "../pages/Dashboard/Faq/FaqPage";

const DashboardRoutes = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Routes>
          <Route path="" element={<DashboardHome />} />
          <Route path="currency" element={<ManageCurrency />} />
          <Route path="rate" element={<ManageRate />} />
          <Route path="countries" element={<ManageCountries />} />
          <Route path="fees" element={<ManageFees />} />
          <Route path="admin" element={<ManageAdmin />} />
          <Route path="user" element={<ManageUser />} />
          <Route path="add-fiat" element={<AddFiatPage />} />
          <Route path="add-crypto" element={<AddCryptoPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="network-provider" element={<NetworkProvider />} />
          <Route path="bill-provider" element={<BillProvider />} />
          <Route path="betting-provider" element={<BettingProvider />} />
          <Route path="card" element={<Card />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="support" element={<Support />} />
          <Route path="blog" element={<BlogPage />} /> 
          <Route path="account-password" element={<AccountPassword />} />
          <Route path="details-page/:id" element={<DetailsPage />} />
          <Route path="blog-category" element={<CategoryPage />} />
          <Route path="provider-category" element={<ProviderPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardRoutes;