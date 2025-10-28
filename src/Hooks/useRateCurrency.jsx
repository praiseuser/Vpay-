import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';

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
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const hasFetchedCurrencies = useRef(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const userState = useSelector((state) => state.user);
  const token = userState?.token;

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (!token) {
        setError("Authentication token is missing");
        CustomErrorToast("Authentication token is missing");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.result || [];
        const formattedCurrencies = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id,
              fiat_currency_name: item.fiat_currency_name,
              fiat_currency_code: item.fiat_currency_code,
              country_code: item.country_code,
              status: item.status,
            }))
          : [];

        setCurrencies(formattedCurrencies);

        if (!hasFetchedCurrencies.current) {
          CustomSuccessToast("Fiat currencies fetched successfully");
          hasFetchedCurrencies.current = true;
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch fiat currencies";
        setError(errorMessage);
        CustomErrorToast(errorMessage);
      }
    };

    fetchCurrencies();
  }, [token]);

 
const createRate = async (currency, rate, status, activityPin) => {
  if (!token || !currency || !rate) {
    CustomErrorToast("Token, currency, or rate is missing");
    return { success: false };
  }

  if (!activityPin?.trim()) {
    CustomErrorToast("Account password is required");
    return { success: false };
  }

  setIsCreating(true);
  setError(null);

  try {
    const currencyStr = String(currency).trim();
    const isId = /^\d+$/.test(currencyStr);

    const payload = {
      rate: String(rate),
      status: status === "null" ? null : String(status),
    };

    if (isId) {
      payload.currency_id = currencyStr;     
    } else {
      payload.currency_name = currencyStr;  
    }

    const response = await axios.post(
      `${API_BASE_URL}/admin/rate/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          activity_pin: activityPin,
        },
      }
    );

    const result = response.data;
    if (result?.error === 0) {
      const displayCurrency = isId
        ? (currencies.find((c) => String(c.id) === currencyStr)?.fiat_currency_name ||
           `ID ${currencyStr}`)
        : currencyStr;

      CustomSuccessToast(`Rate created successfully for ${displayCurrency}`);
      setPasswordVerified(true);
      setShowPasswordModal(false);
}
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to create rate";
    CustomErrorToast(errorMessage);
    setError(errorMessage);
    return { success: false };
  } finally {
    setIsCreating(false);
  }
};


  const resetState = () => {
    setIsCreating(false);
    setPasswordVerified(false);
    setShowPasswordModal(false);
    setError(null);
  };

  return {
    createRate,
    isCreating,
    error,
    currencies,
    passwordVerified,
    showPasswordModal,
    setShowPasswordModal,
    resetState,
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

export { useFetchRateCurrencies, useCreateRate, useDeleteRate, useViewRate };