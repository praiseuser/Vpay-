import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Public/Home";
import Login from "../pages/Public/Login";


const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PublicRoutes;