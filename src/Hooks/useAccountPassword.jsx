import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

export const usePasswordManagement = () => {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpMedium, setOtpMedium] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { token, user } = useSelector((state) => state.user) || {};
  const userEmail = user?.email;

  /** Request OTP */
  const requestOtp = useCallback(async () => {
    if (!userEmail) {
      toast(<CustomErrorToast message="User email not found" />);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(
        `${API_BASE_URL}/user/transaction-pin/request/otp`,
        { otp_type: otpMedium },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOtpSent(true);
      toast(<CustomSuccessToast message={`OTP sent successfully to your ${otpMedium}`} />);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to request OTP';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
    } finally {
      setLoading(false);
    }
  }, [token, otpMedium, userEmail]);

  /** Create transaction PIN */
  const createPassword = useCallback(async () => {
    if (!userEmail) {
      toast(<CustomErrorToast message="Email is required to create PIN" />);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(
        `${API_BASE_URL}/user/transaction-pin/create`,
        {
          transaction_pin: password,
          email: userEmail, // ✅ required by backend
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
      toast(<CustomSuccessToast message="Transaction PIN created successfully!" />);
      setPassword('');
      setOtp('');
      setOtpSent(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create password';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
    } finally {
      setLoading(false);
    }
  }, [password, token, userEmail]);

  /** Reset form */
  const resetForm = useCallback(() => {
    setPassword('');
    setOtp('');
    setOtpMedium('email');
    setOtpSent(false);
    setError(null);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!token) {
      setError('No authentication token found');
      setLoading(false);
    }
  }, [token]);

  return {
    password,
    setPassword,
    otp,
    setOtp,
    otpMedium,
    setOtpMedium,
    loading,
    error,
    success,
    otpSent,
    requestOtp,
    createPassword,
    resetForm,
  };
};

export default usePasswordManagement;
