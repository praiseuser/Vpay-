import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

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

            console.log("Fetched rate currencies data:", response.data);

            const data = response.data.result || response.data || [];
            const formattedCurrencies = Array.isArray(data)
                ? data.map((item) => {
                    const rateField = item.rate || item.rate_value || item.exchange_rate || "N/A";
                    return {
                        Currency_Id: item.Currency_Id || "Unknown",
                        Rate: typeof rateField === "string" ? rateField : "N/A",
                        status: item.status || "N/A",
                    };
                })
                : [];

            if (formattedCurrencies.length === 0) {
                setError("No rate data available from the API");
            } else {
                setRateCurrencies(formattedCurrencies);
                if (!hasFetched.current) {
                    toast.success("Rate currencies found");
                    hasFetched.current = true;
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch rate currencies";
            console.error("Error fetching rates:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Current token in useFetchRateCurrencies:", token);
        if (token && !hasFetched.current) {
            fetchRateCurrencies();
        } else if (!token) {
            console.warn("No token found");
            setLoading(false);
        }
    }, [token]);

    return { rateCurrencies, loading, error, refetch: fetchRateCurrencies };
};

const useCreateRate = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    const userState = useSelector((state) => state.user);
    const token = userState.token;

    useEffect(() => {
        const fetchCurrencies = async () => {
            if (!token) {
                console.warn("No token found");
                return;
            }

            try {
                console.log("Fetching fiat currencies from:", `${API_BASE_URL}/admin/fiat-currencies`);
                const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Fiat currencies response:", response.data);
                const fetchedCurrencies = response.data.result || [];
                console.log("Extracted currencies:", fetchedCurrencies);
                setCurrencies(fetchedCurrencies);
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || "Failed to fetch fiat currencies";
                console.error("Fetch fiat currencies error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
                toast.error(`Error: ${errorMessage}`);
            }
        };

        fetchCurrencies();
    }, [token]);

    const createRate = async (selectedCurrencyId, rate, status) => {
        if (!token || !selectedCurrencyId || !rate) {
            setError("Token, currency, or rate is missing");
            toast.error("Token, currency, or rate is missing");
            return { success: false };
        }

        setIsCreating(true);
        setError(null);

        try {
            // Ensure all values are strings, except status can be null
            const stringCurrencyId = String(selectedCurrencyId);
            const stringRate = String(rate);
            const finalStatus = status === "null" ? null : String(status);

            console.log("Creating rate with:", { currency_id: stringCurrencyId, rate: stringRate, status: finalStatus });
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
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Create rate response:", response.data);
            if (response.status >= 200 && response.status < 300) {
                const currency = currencies.find(c => c.id === selectedCurrencyId);
                const currencyName = currency ? currency.fiat_currency : "Unknown Currency";
                toast.success(`Rate created successfully for ${currencyName}`);
                return { success: true, currencyName };
            } else {
                throw new Error(response.data.message || "Failed to create rate");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to create rate";
            console.error("Create rate error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(`Error: ${errorMessage}`);
            return { success: false };
        } finally {
            setIsCreating(false);
        }
    };

    return { createRate, isCreating, error, currencies };
};

const useDeleteRate = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
  
    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');
  
    const deleteRate = useCallback(async (id) => {
      console.log('useDeleteRate - API_BASE_URL:', API_BASE_URL);
      console.log('useDeleteRate - Token:', token);
      console.log('useDeleteRate - deleteRate called with id:', id);
  
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      setError(null);
      setSuccessMessage(null);
  
      if (!token) {
        console.warn('useDeleteRate - No token available for deleteRate');
        setError('Authentication token not found');
        toast.error('Please log in to delete a rate');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }
  
      if (!id) {
        console.error('useDeleteRate - No rate ID provided for deletion');
        setError('No rate ID provided');
        toast.error('No rate ID provided');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }
  
      console.log('useDeleteRate - Sending delete request for rate id:', id);
  
      try {
        const response = await axios.post(`${API_BASE_URL}/admin/rate/delete/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('useDeleteRate - Server response data:', response.data);
        console.log('useDeleteRate - Full response:', response);
        console.log('useDeleteRate - Response status:', response.status);
        console.log('useDeleteRate - Response headers:', response.headers);
  
        setSuccessMessage('Rate deleted successfully!');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        toast.success('Rate deleted successfully!', { toastId: 'delete-rate-success' });
        return response.data;
      } catch (err) {
        let errorMessage = 'Something went wrong while deleting the rate';
        if (err.response) {
          errorMessage = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : err.message) || errorMessage;
          console.error('useDeleteRate - Error response data:', err.response.data);
          console.error('useDeleteRate - Error response status:', err.response.status);
          console.error('useDeleteRate - Error response headers:', err.response.headers);
        } else {
          errorMessage = err.message || errorMessage;
        }
        console.error('useDeleteRate - Error message:', errorMessage);
        console.error('useDeleteRate - Full error:', err);
        setError(errorMessage);
        toast.error(errorMessage, { toastId: 'delete-rate-error' });
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return null;
      }
    }, [token]);
  
    const isRateLoading = (rateId) => !!loadingStates[rateId];
  
    return { deleteRate, isRateLoading, error, successMessage };
  };
  

export { useFetchRateCurrencies, useCreateRate, useDeleteRate };