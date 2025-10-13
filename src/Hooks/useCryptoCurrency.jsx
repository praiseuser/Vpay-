import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import updateConfig from '../utilities/updateConfig';
import { useAuth } from '../context/AuthContext';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';

const useFetchCurrencies = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  useEffect(() => {
    const fetchCryptoCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/crypto-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.result || response.data || [];
        if (Array.isArray(data) && data.length === 0) {
          setError('No cryptocurrency found');
          CustomErrorToast('No cryptocurrency found');
        } else {
          setCryptoCurrencies(Array.isArray(data) ? data : []);
          CustomSuccessToast('Crypto currencies fetched successfully!');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch crypto currencies';
        setError(errorMessage);
        CustomErrorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token && !hasFetched.current) {
      fetchCryptoCurrencies();
      hasFetched.current = true;
    } else if (!token) {
      setError('Authentication token is missing');
      CustomErrorToast('Authentication token is missing');
      setLoading(false);
    }
  }, [token]);

  return { cryptoCurrencies, loading, error };
};

const useCreateCryptoCurrency = () => {
  const { config } = useAuth();

  return async (formData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);

    console.log("Creating crypto with data:", formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/crypto-currency/create`,
        formData,
        updatedConfig
      );

      CustomSuccessToast(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error:", error);

      if (error?.response?.data?.message) {
        CustomErrorToast(error.response.data.message);
      } else {
        CustomErrorToast("An error occurred!");
      }
    }
  };
};

const useEditFiatStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Start as false

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const editCurrency = async (id, updatedData, accountPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage(null);
    setShowPasswordModal(true); // Show modal only when editing is triggered

    if (!token || typeof token !== 'string' || token.trim() === '') {
      setError('Invalid or missing authentication token');
      customErrorToast('Invalid or missing authentication token');
      setLoading(false);
      setShowPasswordModal(false); // Hide if token fails
      return null;
    }

    if (!accountPassword || typeof accountPassword !== 'string' || accountPassword.trim() === '') {
      setError('Account password is required');
      customErrorToast('Account password is required');
      setLoading(false);
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/crypto-currency/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'account-password': accountPassword,
        },
      });

      const message = response.data.message || 'Cryptocurrency updated successfully';
      setSuccess(true);
      setSuccessMessage(message);
      customSuccessToast(message);
      setPasswordVerified(true);
      setShowPasswordModal(false); // Hide after success
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid password or failed to update cryptocurrency';
      setError(errorMessage);
      customErrorToast(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSuccess(false);
    setPasswordVerified(false);
    setShowPasswordModal(false); // Ensure modal stays hidden on reset
    setError(null);
    setSuccessMessage(null);
  };

  return { editCurrency, loading, error, success, successMessage, passwordVerified, showPasswordModal, setShowPasswordModal, resetState };
};

export { useFetchCurrencies, useCreateCryptoCurrency, useEditFiatStatus };