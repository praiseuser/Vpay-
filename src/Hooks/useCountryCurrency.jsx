import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';

const useFetchCountryCurrencies = () => {
    const [countryCurrencies, setCountryCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const userState = useSelector((state) => state.user);
    const token = userState.token;

    useEffect(() => {
        const fetchCountryCurrencies = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_BASE_URL}/admin/countries`, {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                const data = response.data.result || response.data || [];
                const formattedCurrencies = Array.isArray(data)
                    ? data.map((item) => ({
                        id: item.id || 'Unknown',
                        Currency_Id: item.currency_id || item.currency || 'Unknown',
                        Country_name: item.country_name || item.name || 'Unknown',
                        Country_code: item.country_code || item.code || 'N/A',
                        Country_dial_code: item.country_dial_code || item.dial_code || item.phone_code || 'N/A',
                        Country_Flag: item.country_flag || item.flag || 'N/A',
                        status: item.status || 'N/A',
                    }))
                    : [];

                if (formattedCurrencies.length === 0) {
                    setError('No country data available from the API');
                    CustomErrorToast('No country data available');
                } else {
                    setCountryCurrencies(formattedCurrencies);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch country currencies';
                setError(errorMessage);
                CustomErrorToast(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (token && !hasFetched.current) {
            fetchCountryCurrencies();
            hasFetched.current = true;
        } else if (!token) {
            setError('Authentication token is missing');
            CustomErrorToast('Authentication token is missing');
            setLoading(false);
        }
    }, [token]);

    return { countryCurrencies, loading, error };
};
const useAddCountry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const hasFetchedCurrencies = useRef(false);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchFiatCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data.result || response.data || [];
        const formattedCurrencies = Array.isArray(data)
          ? data.map((item) => ({
            currency_id: String(item.id || item.currency_id || 'Unknown'),
            currency_name: item.fiat_currency || item.name || item.currency_name || 'Unknown',
            country_name: item.country_name || 'N/A',
            country_code: item.country_code || 'N/A',
            country_dial_code: item.dial_code || item.phone_code || 'N/A',
            status: item.status || 'active',
          }))
          : [];

        if (formattedCurrencies.length === 0) {
          setError('No fiat currencies available from the API');
          CustomErrorToast('No fiat currencies available');
        } else {
          setFiatCurrencies(formattedCurrencies);
          if (!hasFetchedCurrencies.current) {
            CustomSuccessToast('Fiat currencies loaded successfully');
            hasFetchedCurrencies.current = true;
          }
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch fiat currencies';
        setError(errorMessage);
        CustomErrorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token && !hasFetchedCurrencies.current) {
      fetchFiatCurrencies();
    } else if (!token) {
      setError('Authentication token is missing');
      CustomErrorToast('Authentication token is missing');
      setLoading(false);
    }
  }, [token]);

  const addCountry = async (countryData, accountPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!token || typeof token !== 'string' || token.trim() === '') {
      setError('Invalid or missing authentication token');
      CustomErrorToast('Invalid or missing authentication token');
      setLoading(false);
      return false;
    }

    if (!accountPassword || typeof accountPassword !== 'string' || accountPassword.trim() === '') {
      setError('Account password is required');
      CustomErrorToast('Account password is required');
      setLoading(false);
      return false;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/countries/create`,
        countryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'account-password': accountPassword,
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setPasswordVerified(true);
        setShowPasswordModal(false);
        CustomSuccessToast('Country added successfully!');
        return true;
      } else {
        const message = response.data.message || 'Failed to add country';
        setError(message);
        CustomErrorToast(message);
        return false;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to add country';
      setError(message);
      CustomErrorToast(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSuccess(false);
    setPasswordVerified(false);
    setShowPasswordModal(false); 
    setError(null);
  };

  return { addCountry, fiatCurrencies, loading, error, success, resetState, passwordVerified, showPasswordModal, setShowPasswordModal, setPasswordVerified };
};
const useDeleteCountry = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(true);

    const token = useSelector((state) => state.user.token);

    const deleteCountry = async (countryId, accountPassword) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token || typeof token !== 'string' || token.trim() === '') {
            setError('Invalid or missing authentication token');
            CustomErrorToast('Invalid or missing authentication token');
            setLoading(false);
            return false;
        }

        if (!accountPassword || typeof accountPassword !== 'string' || accountPassword.trim() === '') {
            setError('Account password is required');
            CustomErrorToast('Account password is required');
            setLoading(false);
            return false;
        }

        try {
            const response = await axios.delete(
                `${API_BASE_URL}/admin/countries/${countryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'account-password': accountPassword,
                    },
                }
            );

            if (response.data.success) {
                setSuccess(true);
                setPasswordVerified(true);
                setShowPasswordModal(false);
                CustomSuccessToast('Country deleted successfully!');
                return true;
            } else {
                const message = response.data.message || 'Failed to delete country';
                setError(message);
                CustomErrorToast(message);
                return false;
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Failed to delete country';
            setError(message);
            CustomErrorToast(message);
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
        deleteCountry,
        loading,
        error,
        success,
        resetState,
        passwordVerified,
        showPasswordModal,
        setShowPasswordModal,
        setPasswordVerified,
    };
};
const useViewCountryById = () => {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetchedId, setLastFetchedId] = useState(null);

    const token = useSelector((state) => state.user.token);

    const viewCountry = async (id) => {
        if (lastFetchedId === id && country) {
            return country;
        }

        setLoading(true);
        setError(null);

        if (!token) {
            setError('Authentication token is missing');
            CustomErrorToast('Authentication token is missing');
            setLoading(false);
            return;
        }

        if (!id) {
            setError('Country ID is required');
            CustomErrorToast('Country ID is required');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/admin/countries/view/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                const data = response.data.result || response.data || {};
                const formattedCountry = {
                    id: data.id || 'Unknown',
                    Currency_Id: data.currency_id || data.currency || 'Unknown',
                    Country_name: data.country_name || data.name || 'Unknown',
                    Country_code: data.country_code || data.code || 'N/A',
                    Country_dial_code: data.country_dial_code || data.dial_code || data.phone_code || 'N/A',
                    Country_Flag: data.country_flag || data.flag || 'N/A',
                    status: data.status || 'N/A',
                };

                setCountry(formattedCountry);
                setLastFetchedId(id);
                return formattedCountry;
            } else {
                setCountry(null);
                const message = response.data.message || 'Failed to retrieve country';
                setError(message);
                CustomErrorToast(message);
            }
        } catch (err) {
            setCountry(null);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to retrieve country';
            setError(errorMessage);
            CustomErrorToast(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { viewCountry, country, loading, error };
};

export { useFetchCountryCurrencies, useAddCountry, useDeleteCountry, useViewCountryById };