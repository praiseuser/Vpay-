import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import customErrorToast from '../components/CustomErrorToast';
import customSuccessToast from '../components/CustomSuccessToast';

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
          customErrorToast('No cryptocurrency found');
        } else {
          setCryptoCurrencies(Array.isArray(data) ? data : []);
          customSuccessToast('Crypto currencies fetched successfully!');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch crypto currencies';
        setError(errorMessage);
        customErrorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token && !hasFetched.current) {
      fetchCryptoCurrencies();
      hasFetched.current = true;
    } else if (!token) {
      setError('Authentication token is missing');
      customErrorToast('Authentication token is missing');
      setLoading(false);
    }
  }, [token]);

  return { cryptoCurrencies, loading, error };
};
const useCreateCryptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const createCryptoCurrency = async (cryptoData, accountPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!token || typeof token !== 'string' || token.trim() === '') {
      setError('Invalid or missing authentication token');
      customErrorToast('Invalid or missing authentication token');
      setLoading(false);
      return false;
    }

    if (!accountPassword || typeof accountPassword !== 'string' || accountPassword.trim() === '') {
      setError('Account password is required');
      customErrorToast('Account password is required');
      setLoading(false);
      return false;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/crypto-currency/create`, cryptoData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'account-password': accountPassword,
        },
      });

      if (response.data.success) {
        setSuccess(true);
        setPasswordVerified(true);
        setShowPasswordModal(false);
        customSuccessToast('Crypto currency created successfully');
        return true;
      } else {
        const message = response.data.message || 'Failed to create crypto currency';
        setError(message);
        customErrorToast(message);
        return false;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid password or failed to create crypto currency';
      setError(errorMessage);
      customErrorToast(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSuccess(false);
    setPasswordVerified(false);
    setShowPasswordModal(true);
    setError(null);
  };

  return { 
    createCryptoCurrency, 
    loading, 
    error, 
    success,
    showPasswordModal,
    passwordVerified,
    resetState
  };
};
const useEditFiatStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const editCurrency = async (id, updatedData, accountPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage(null);

    if (!token || typeof token !== 'string' || token.trim() === '') {
      setError('Invalid or missing authentication token');
      customErrorToast('Invalid or missing authentication token');
      setLoading(false);
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
      setShowPasswordModal(false);
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
    setShowPasswordModal(true);
    setError(null);
    setSuccessMessage(null);
  };

  return { editCurrency, loading, error, success, successMessage, passwordVerified, showPasswordModal, resetState };
};

export { useFetchCurrencies, useCreateCryptoCurrency, useEditFiatStatus };