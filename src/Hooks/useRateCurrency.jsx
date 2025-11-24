import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';
import { useAuth } from '../context/AuthContext';
import updateConfig from '../utilities/updateConfig';

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
      console.log('Fetched rate currencies:', data);
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
        CustomErrorToast('No rate data available');
      } else {
        setRateCurrencies(formattedCurrencies);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch rate currencies';
      setError(errorMessage);
      CustomErrorToast(errorMessage);
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
      CustomErrorToast('Authentication token is missing');
      setLoading(false);
    }
  }, [token]);

  return { rateCurrencies, loading, error, refetch: fetchRateCurrencies };
};
const useCreateRate = () => {
  const { config } = useAuth();

  return async (formData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    console.log("Creating crypto with data:", formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/rate/create`,
        formData,
        updatedConfig
      );

      CustomSuccessToast(response.data.message);
      console.log("Create rate response:", response.data);
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
const useDeleteRate = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activityPin, setActivityPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [currentRateId, setCurrentRateId] = useState(null);

  const userState = useSelector((state) => state.user);
  const token = userState?.token || localStorage.getItem("token");

  const resetState = () => {
    setShowPasswordModal(false);
    setActivityPin("");
    setPinLoading(false);
    setCurrentRateId(null);
    setError(null);
    setSuccessMessage(null);
  };

  const deleteRate = useCallback(
    async (id, pin) => {
      setError(null);
      setSuccessMessage(null);

      const rateId = id || currentRateId;

      if (!token) {
        setError("Authentication token not found");
        customErrorToast("Please log in to delete a rate");
        return;
      }

      if (!rateId) {
        setError("No rate ID provided");
        customErrorToast("No rate ID provided");
        return;
      }

      if (!pin) {
        setCurrentRateId(rateId);
        setShowPasswordModal(true);
        return;
      }

      setLoadingStates((prev) => ({ ...prev, [rateId]: true }));
      setPinLoading(true);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/admin/rate/delete/${rateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              activity_pin: activityPin,
            },
          }
        );

        setSuccessMessage("Rate deleted successfully!");
        customSuccessToast("Rate deleted successfully!");
        resetState();
        return response.data;
      } catch (err) {
        let errorMessage = "Something went wrong while deleting the rate";
        if (err.response) {
          errorMessage =
            err.response?.data?.message || err.message || errorMessage;
        } else {
          errorMessage = err.message || errorMessage;
        }
        setError(errorMessage);
        customErrorToast(errorMessage);
        return null;
      } finally {
        setLoadingStates((prev) => ({ ...prev, [rateId]: false }));
        setPinLoading(false);
      }
    },
    [token, currentRateId]
  );

  const isRateLoading = (rateId) => !!loadingStates[rateId];

  return {
    deleteRate,
    isRateLoading,
    error,
    successMessage,
    showPasswordModal,
    activityPin,
    setActivityPin,
    pinLoading,
    resetState,
    currentRateId,
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

      console.log('API Response:', response.data); // Debug log

      let rateData = null;
      if (response.data && typeof response.data === 'object') {
        // Check if data is directly in response.data
        if (response.data.currency_id && response.data.rate) {
          rateData = response.data;
        }
        // Check if data is in result array
        else if (Array.isArray(response.data.result) && response.data.result.length > 0) {
          rateData = response.data.result[0];
        }
        // Check if data is in a different key (e.g., data)
        else if (response.data.data && typeof response.data.data === 'object' && response.data.data.currency_id && response.data.data.rate) {
          rateData = response.data.data;
        }

        if (!rateData || !rateData.currency_id || !rateData.rate) {
          throw new Error('Rate data missing expected fields (currency_id or rate)');
        }

        setRate(rateData);
        return rateData;
      } else {
        throw new Error('Invalid response format: Expected JSON object');
      }
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
const useUpdatRate = () => {
  const { config } = useAuth();

  return async (id, categoryData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin)
    try {

      const response = await axios.post(
        `${API_BASE_URL}/admin/rate/update/${id}`,
        categoryData,
        updatedConfig,
      );
      CustomSuccessToast(response.data.message);
      console.log("Respone:", response.data)
      return response.data;
    } catch (error) {
      console.error("Error:", error)
      if (error?.response?.data?.error) {
        CustomErrorToast(error.response.data.message)
      } else {
        CustomErrorToast("An error Occured while updating Rate")
      }
    }
  };
};
export { useFetchRateCurrencies, useCreateRate, useDeleteRate, useViewRate, useUpdatRate };