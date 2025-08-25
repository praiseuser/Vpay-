import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import customErrorToast from '../components/CustomErrorToast';
import customSuccessToast from '../components/CustomSuccessToast';

const useFetchFiatCurrencies = () => {
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  useEffect(() => {
    const fetchFiatCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.result || [];
        const formattedCurrencies = Array.isArray(data)
          ? data.map((item) => ({
            fiat_currency_name: item.fiat_currency_name,
            fiat_currency_code: item.fiat_currency_code,
            status: item.status,
          }))
          : [];

        setFiatCurrencies(formattedCurrencies);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch fiat currencies';
        setError(errorMessage);
        customErrorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token && !hasFetched.current) {
      fetchFiatCurrencies();
      hasFetched.current = true;
    }
  }, [token]);

  return { fiatCurrencies, loading, error };
};
const useCreateFiatCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const createFiatCurrency = async (fiatData, accountPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      ...fiatData,
      status: fiatData.status === 1 ? '1' : '0',
    };

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
      const response = await axios.post(`${API_BASE_URL}/admin/fiat-currency/create`, payload, {
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
        customSuccessToast('Fiat currency created successfully');
        return true;
      } else {
        const message = response.data.message || 'Failed to create fiat currency';
        setError(message);
        customErrorToast(message);
        return false;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid password or failed to create fiat currency';
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

  return { createFiatCurrency, loading, error, success, passwordVerified, showPasswordModal, resetState };
};

export { useFetchFiatCurrencies, useCreateFiatCurrency };