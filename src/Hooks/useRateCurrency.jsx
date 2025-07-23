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
              fiat_currency_code: item.fiat_currency_code || "Unknown",
              rate: typeof rateField === "string" ? rateField : "N/A",
              status: item.status || "N/A",
              created_at: item.created_at || null,
              updated_at: item.updated_at || null,
              id: item.id || item.currency_id || null, 
            };
          })
        : [];

      if (formattedCurrencies.length === 0) {
        setError("No rate data available from the API");
      } else {
        setRateCurrencies(formattedCurrencies);
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
    if (token && !hasFetched.current) {
      fetchRateCurrencies();
      hasFetched.current = true;
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
  const hasFetchedCurrencies = useRef(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (!token) {
        console.warn("No token found");
        setError("Authentication token is missing");
        toast.error("Authentication token is missing");
        return;
      }

      try {
        console.log("Fetching fiat currencies from:", `${API_BASE_URL}/admin/fiat-currencies`);
        const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Fiat currencies response:", response.data);
        const fetchedCurrencies = response.data.result || response.data || [];
        const formattedCurrencies = Array.isArray(fetchedCurrencies)
          ? fetchedCurrencies.map((item) => ({
            currency_id: item.id || item.currency_id || "Unknown",
            currency_name: item.name || item.fiat_currency || item.currency_name || "Unknown",
            country_name: item.country_name || "N/A",
            country_code: item.country_code || "N/A",
            country_dial_code: item.dial_code || item.phone_code || "N/A",
            status: item.status || "active",
          }))
          : [];

        if (formattedCurrencies.length === 0) {
          setError("No fiat currencies available from the API");
          toast.error("No fiat currencies available");
        } else {
          setCurrencies(formattedCurrencies);
          if (!hasFetchedCurrencies.current) {
            toast.success("Fiat currencies fetched successfully");
            hasFetchedCurrencies.current = true;
          }
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to fetch fiat currencies";
        console.error("Fetch fiat currencies error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    fetchCurrencies();
  }, [token]);

  const createRate = async (selectedCurrencyId, rate, status) => {
    if (!token || !selectedCurrencyId || !rate) {
      const errorMessage = "Token, currency, or rate is missing";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false };
    }

    setIsCreating(true);
    setError(null);

    try {
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
        const currency = currencies.find((c) => c.currency_id === stringCurrencyId);
        const currencyName = currency ? currency.currency_name : "Unknown Currency";
        toast.success(`Rate created successfully for ${currencyName}`);
        return { success: true, currencyName };
      } else {
        throw new Error(response.data.message || "Failed to create rate");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to create rate";
      console.error("Create rate error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast.error(errorMessage);
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

  const deleteRate = useCallback(
    async (id) => {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      setError(null);
      setSuccessMessage(null);

      if (!token) {
        setError('Authentication token not found');
        toast.error('Please log in to delete a rate');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }

      if (!id) {
        setError('No rate ID provided');
        toast.error('No rate ID provided');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return;
      }

      try {
        console.log(`Deleting rate with ID: ${id}`);
        const response = await axios.get(`${API_BASE_URL}/admin/rate/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setSuccessMessage('Rate deleted successfully!');
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        toast.success('Rate deleted successfully!', { toastId: 'delete-rate-success' });
        return response.data;
      } catch (err) {
        let errorMessage = 'Something went wrong while deleting the rate';
        if (err.response) {
          errorMessage =
            err.response.data?.message ||
            (typeof err.response.data === 'string' ? err.response.data : err.message) ||
            errorMessage;
        } else {
          errorMessage = err.message || errorMessage;
        }

        setError(errorMessage);
        toast.error(errorMessage, { toastId: 'delete-rate-error' });
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
        return null;
      }
    },
    [token]
  );

  const isRateLoading = (rateId) => !!loadingStates[rateId];

  return { deleteRate, isRateLoading, error, successMessage };
};


// const useUpdateRate = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState('');

//   const userState = useSelector((state) => state.user);
//   const token = userState.token;

//   const updateRate = async (id, data) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);
//     setMessage('');

//     try {
//       // Prepare URLSearchParams form data
//       const formData = new URLSearchParams();
//       formData.append('currency_id', data.currency_id);
//       formData.append('rate', data.rate);
//       formData.append('status', data.status);

//       // POST request
//       const response = await axios.post(
//         `${API_BASE_URL}/admin/rate/update/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data?.success) {
//         setSuccess(true);
//         setMessage(response.data.message || 'Rate updated successfully!');
//         return { success: true, message: response.data.message };
//       } else {
//         setError(response.data?.message || 'Update failed');
//         return { success: false, message: response.data?.message || 'Update failed' };
//       }
//     } catch (err) {
//       const errMsg = err.response?.data?.message || err.message || 'An error occurred';
//       setError(errMsg);
//       return { success: false, message: errMsg };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateRate, loading, error, success, message };
// };

const useViewRate = () => {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const fetchRate = useCallback(async (id) => {
    if (!id) {
      const errorMessage = 'No rate ID provided';
      console.error('useViewRate - fetchRate:', errorMessage);
      setError(errorMessage);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching rate details for ID: ${id}`);
      const response = await axios.get(`${API_BASE_URL}/admin/rate/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (typeof response.data !== 'object' || response.data === null) {
        const errorMessage = 'Invalid response format: Expected JSON object';
        console.error('useViewRate - fetchRate:', errorMessage, response.data);
        throw new Error(errorMessage);
      }

      if (!Array.isArray(response.data.result) || response.data.result.length === 0) {
        const errorMessage = 'Response missing rate data in result array';
        console.error('useViewRate - fetchRate:', errorMessage, response.data);
        throw new Error(errorMessage);
      }

      const rateData = response.data.result[0];
      if (!rateData.currency_id && !rateData.rate) {
        const errorMessage = 'Rate data missing expected fields (currency_id or rate)';
        console.error('useViewRate - fetchRate:', errorMessage, rateData);
        throw new Error(errorMessage);
      }

      console.log('Rate details fetched successfully:', rateData);
      setRate(rateData);
      return rateData;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { rate, loading, error, fetchRate };
};

export { useFetchRateCurrencies, useCreateRate, useDeleteRate, useViewRate };