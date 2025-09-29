import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/path";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/Slices/userSlice";
import { useSelector } from "react-redux";
import CustomSuccessToast from "../components/CustomSuccessToast";
import CustomErrorToast from "../components/CustomErrorToast";
import { logoutUser } from "../store/Slices/userSlice";

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Sending login request with data:", userData);
      console.log("API Endpoint:", `${API_BASE_URL}/auth/user/login`);
      const response = await axios.post(
        `${API_BASE_URL}/auth/user/login`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      const result = response.data;
      console.log("Full API response:", result);

      if (response.status === 200 || response.status === 202) {
        const successMessage = result?.message || "OTP sent, please verify to continue!";
        toast(<CustomSuccessToast message={successMessage} />);

        if (result.user || result.result?.[0]) {
          dispatch(storeUser(result.user || result.result?.[0]));
        }

        localStorage.setItem("email", userData.email);
        localStorage.setItem("password", userData.password);
        localStorage.setItem("otp_medium", result.otp_medium || "email");

        navigate("/otp");
      } else {
        throw new Error(result?.message || "Unexpected response from server.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Network or server error";
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
const useVerifyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyLogin = async ({ email, password, otp_medium, otp }) => {
    setLoading(true);
    setError(null);

    const requestData = { email, password, otp_medium, otp };
    console.log("Sending OTP verification request:", requestData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/user/login/`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      const result = response.data;
      console.log("Response from server:", result);

      if (response.status === 200 && result?.result) {
        dispatch(storeUser(result.result));
        toast(<CustomSuccessToast message="User Logged In" />);
        navigate("/dashboard");
      } else {
        throw new Error(result?.message || "Invalid response from server.");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      toast(<CustomErrorToast message={errMsg} />);
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { verifyLogin, loading, error };
};
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log("Current token in useLogout:", token);
  }, [token]);

  const logout = async () => {
    setLoading(true);
    setError(null);

    console.log("Token at logout:", token);

    try {
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        `${API_BASE_URL}/auth/user/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout API response:", response.data);

      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("otp_type");

      dispatch(logoutUser());

      toast(<CustomSuccessToast message="User logged out successfully" />);
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Logout failed";
      setError(errorMessage);
      console.error("Logout failed:", err.response ? err.response.data : err.message);

      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
export { useAuthentication, useVerifyLogin, useLogout }
