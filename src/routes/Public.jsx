import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Public/Home";
import Login from "../pages/Public/Login";
import Otp from "../pages/Public/Otp"

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
    </Routes>
  );
};

export default PublicRoutes;