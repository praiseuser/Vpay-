import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import customErrorToast from '../components/CustomErrorToast';
import customSuccessToast from '../components/CustomSuccessToast';

const useFetchRateCurrencies = () => {
  const [rateCurrencies, setRateCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const fetchRateCurrencies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/rates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.result || response.data || [];
      const formattedCurrencies = Array.isArray(data)
        ? data.map((item) => {
            const rateField = item.rate || item.rate_value || item.exchange_rate || 'N/A';
            return {
              fiat_currency_code: item.fiat_currency_code || 'Unknown',
              rate: typeof rateField === 'string' ? rateField : 'N/A',
              status: item.status || 'N/A',
              created_at: item.created_at || null,
              updated_at: item.updated_at || null,
              id: item.id || item.currency_id || null,
            };
          })
        : [];

      if (formattedCurrencies.length === 0) {
        setError('No rate data available from the API');
        customErrorToast('No rate data available');
      } else {
        setRateCurrencies(formattedCurrencies);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch rate currencies';
      setError(errorMessage);
      customErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && !hasFetched.current) {
      fetchRateCurrencies();
      hasFetched.current = true;
    } else if (!token) {
      setError('Authentication token is missing');
      customErrorToast('Authentication token is missing');
      setLoading(false);
    }
  }, [token]);

  return { rateCurrencies, loading, error, refetch: fetchRateCurrencies };
};
const useCreateRate = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const hasFetchedCurrencies = useRef(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Changed to false

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (!token) {
        setError('Authentication token is missing');
        customErrorToast('Authentication token is missing');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const fetchedCurrencies = response.data.result || response.data || [];
        const formattedCurrencies = Array.isArray(fetchedCurrencies)
          ? fetchedCurrencies.map((item) => ({
            currency_id: item.id || item.currency_id || 'Unknown',
            currency_name: item.name || item.fiat_currency || item.currency_name || 'Unknown',
            country_name: item.country_name || 'N/A',
            country_code: item.country_code || 'N/A',
            country_dial_code: item.dial_code || item.phone_code || 'N/A',
            status: item.status || 'active',
          }))
          : [];

        if (formattedCurrencies.length === 0) {
          setError('No fiat currencies available from the API');
          customErrorToast('No fiat currencies available');
        } else {
          setCurrencies(formattedCurrencies);
          if (!hasFetchedCurrencies.current) {
            customSuccessToast('Fiat currencies fetched successfully');
            hasFetchedCurrencies.current = true;
          }
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch fiat currencies';
        setError(errorMessage);
        customErrorToast(errorMessage);
      }
    };

    fetchCurrencies();
  }, [token]);

  const createRate = async (selectedCurrencyId, rate, status, accountPassword) => {
    if (!token || !selectedCurrencyId || !rate) {
      const errorMessage = 'Token, currency, or rate is missing';
      setError(errorMessage);
      customErrorToast(errorMessage);
      return { success: false };
    }

    if (!accountPassword || typeof accountPassword !== 'string' || accountPassword.trim() === '') {
      setError('Account password is required');
      customErrorToast('Account password is required');
      return { success: false };
    }

    setIsCreating(true);
    setError(null);

    try {
      const stringCurrencyId = String(selectedCurrencyId);
      const stringRate = String(rate);
      const finalStatus = status === 'null' ? null : String(status);

      const response = await axios.post(
        `${API_BASE_URL}/admin/rate/create`,
        {
          currency_id: stringCurrencyId,
          rate: stringRate,
          status: finalStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'account-password': accountPassword,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const currency = currencies.find((c) => c.currency_id === stringCurrencyId);
        const currencyName = currency ? currency.currency_name : 'Unknown Currency';
        customSuccessToast(`Rate created successfully for ${currencyName}`);
        setPasswordVerified(true);
        setShowPasswordModal(false);
        return { success: true, currencyName };
      } else {
        throw new Error(response.data.message || 'Failed to create rate');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Invalid password or failed to create rate';
      setError(errorMessage);
      customErrorToast(errorMessage);
      return { success: false };
    } finally {
      setIsCreating(false);
    }
  };

  const resetState = () => {
    setIsCreating(false);
    setPasswordVerified(false);
    setShowPasswordModal(false); // Changed to false
    setError(null);
  };

  return { createRate, isCreating, error, currencies, passwordVerified, showPasswordModal, setShowPasswordModal, resetState };
};
const useDeleteRate = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [currentRateId, setCurrentRateId] = useState(null);

  const userState = useSelector((state) => state.user);
  const token = userState?.token || localStorage.getItem('token');

  const resetState = () => {
    setShowPasswordModal(false);
    setPasswordVerified(false);
    setAccountPassword('');
    setPasswordLoading(false);
    setCurrentRateId(null);
    setError(null);
    setSuccessMessage(null);
  };

  const verifyPassword = async (password) => {
    setPasswordLoading(true);
    try {
      if (password === 'testpassword') {
        setPasswordVerified(true);
        setShowPasswordModal(false);
        return true;
      } else {
        setError('Incorrect password');
        return false;
      }
    } catch (err) {
      setError('Failed to verify password');
      return false;
    } finally {
      setPasswordLoading(false);
    }
  };

  const deleteRate = useCallback(
    async (id) => {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      setError(null);
      setSuccessMessage(null);

      if (!token) {
        setError('Authentication token not found');
        customErrorToast('Please log in to delete a rate');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }

      if (!id) {
        setError('No rate ID provided');
        customErrorToast('No rate ID provided');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }

      if (!passwordVerified) {
        setCurrentRateId(id);
        setShowPasswordModal(true);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/rate/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'account-password': accountPassword,
          },
        });

        setSuccessMessage('Rate deleted successfully!');
        customSuccessToast('Rate deleted successfully!');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        resetState();
        return response.data;
      } catch (err) {
        let errorMessage = 'Something went wrong while deleting the rate';
        if (err.response) {
          errorMessage = err.response?.data?.message || err.message || errorMessage;
        } else {
          errorMessage = err.message || errorMessage;
        }
        setError(errorMessage);
        customErrorToast(errorMessage);
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return null;
      }
    },
    [token, passwordVerified, accountPassword]
  );

  const isRateLoading = (rateId) => !!loadingStates[rateId];

  return {
    deleteRate,
    isRateLoading,
    error,
    successMessage,
    showPasswordModal,
    passwordVerified,
    accountPassword,
    setAccountPassword,
    passwordLoading,
    resetState,
    verifyPassword,
  };
};
const useViewRate = () => {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const fetchRate = useCallback(async (id) => {
    if (!id) {
      setError('No rate ID provided');
      customErrorToast('No rate ID provided');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/rate/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof response.data !== 'object' || response.data === null) {
        throw new Error('Invalid response format: Expected JSON object');
      }

      if (!Array.isArray(response.data.result) || response.data.result.length === 0) {
        throw new Error('Response missing rate data in result array');
      }

      const rateData = response.data.result[0];
      if (!rateData.currency_id && !rateData.rate) {
        throw new Error('Rate data missing expected fields (currency_id or rate)');
      }

      setRate(rateData);
      return rateData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to retrieve rate';
      setError(errorMessage);
      customErrorToast(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { rate, loading, error, fetchRate };
};

export { useFetchRateCurrencies, useCreateRate, useDeleteRate, useViewRate };