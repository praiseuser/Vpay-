import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from '../config/path';
import { toast } from "react-toastify";
import CustomErrorToast from "../components/CustomErrorToast";
import CustomSuccessToast from "../components/CustomSuccessToast";

export const useFetchProvider = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const userState = useSelector((state) => state.user);
    const token = userState.token;

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_BASE_URL}/admin/service-providers`, {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                console.log("Full API response:", response.data);

                const data = response.data.result || response.data || [];
                const formattedProviders = Array.isArray(data)
                    ? data.map((item) => ({
                        provider_id: item.id || item.provider_id || "Unknown",
                        provider_name: item.provider_name || item.name || "Unknown",
                        country_id: item.country_id || item.country || "N/A",
                        unit_rate: item.unit_rate || item.rate || 0,
                        provider_category: item.provider_category || item.category || "N/A",
                        status: item.status || false,
                    }))
                    : [];

                if (formattedProviders.length === 0) {
                    setError("No provider data available from the API");
                    toast.warn("No provider data available from the API");
                } else {
                    setProviders(formattedProviders);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || "Failed to fetch providers";
                console.error("Error fetching providers:", errorMessage);
                setError(errorMessage);
                if (!hasFetched.current) toast.error(errorMessage);
            } finally {
                setLoading(false);
                hasFetched.current = true;
            }
        };

        console.log("Current token in useFetchProvider:", token);
        if (token && !hasFetched.current) {
            fetchProviders();
        } else if (!token) {
            console.warn("No token found");
            setLoading(false);
            setError("Authentication required to fetch providers");
            if (!hasFetched.current) toast.error("Authentication required to fetch providers");
        }
    }, [token]);

    return { providers, loading, error };
};
export const useCreateProvider = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const hasFetchedCountries = useRef(false);
  
    const userState = useSelector((state) => state.user);
    const token = userState.token;
  
    useEffect(() => {
      const fetchCountries = async () => {
        if (!token) {
          console.warn("No token found");
          const msg = "Authentication token is missing";
          setError(msg);
          toast(<CustomErrorToast message={msg} />);
          setLoading(false);
          return;
        }
  
        setLoading(true);
        try {
          console.log("Fetching countries from:", `${API_BASE_URL}/admin/countries`);
          const response = await axios.get(`${API_BASE_URL}/admin/countries`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const fetchedCountries = response.data.result || response.data || [];
          const formattedCountries = Array.isArray(fetchedCountries)
            ? fetchedCountries.map((item) => ({
                country_id: item.id || item.country_id || "Unknown",
                country_name: item.name || item.country_name || "Unknown",
                country_code: item.country_code || "N/A",
              }))
            : [];
          setCountries(formattedCountries);
          if (!hasFetchedCountries.current) {
            hasFetchedCountries.current = true;
          }
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Failed to fetch countries";
          console.error("Fetch countries error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
          setError(errorMessage);
          toast(<CustomErrorToast message={errorMessage} />);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCountries();
    }, [token]);
  
    const createProvider = async (providerData) => {
      if (
        !token ||
        !providerData.provider_name ||
        !providerData.country_id ||
        !providerData.unit_rate ||
        !providerData.provider_category ||
        providerData.status === undefined
      ) {
        const errorMessage = "Missing required fields: provider name, country, unit rate, category, or status";
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
        return { success: false };
      }
  
      setLoading(true);
      try {
        console.log("Creating provider with:", providerData);
        const response = await axios.post(
          `${API_BASE_URL}/admin/service-provider/create`,
          {
            provider_name: providerData.provider_name,
            country_id: providerData.country_id,
            unit_rate: providerData.unit_rate,
            provider_category: providerData.provider_category,
            status: providerData.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("Create provider response:", response.data);
        if (response.status >= 200 && response.status < 300) {
          const country = countries.find((c) => c.country_id === providerData.country_id);
          const countryName = country ? country.country_name : "Unknown Country";
          toast(<CustomSuccessToast message={`Provider created successfully`} />);
          return { success: true };
        } else {
          throw new Error(response.data.message || "Failed to create provider");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to create provider";
        console.error("Create provider error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
        return { success: false };
      } finally {
        setLoading(false);
      }
    };
  
    return { createProvider, loading, error, countries };
  };
  export const useUpdateProvider = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const token = useSelector((state) => state.user.token);
  
    const updateProvider = async (id, updatedData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      if (!token) {
        const msg = 'Authentication token is missing';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return { success: false, message: msg };
      }
  
      if (!id) {
        const msg = 'Provider ID is required';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return { success: false, message: msg };
      }
  
      try {
        const response = await axios.put(
          `${API_BASE_URL}/admin/service-provider/update/${id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.data.success) {
          setSuccess(true);
          toast(<CustomSuccessToast message="Provider updated successfully!" />);
          return { success: true, message: 'Provider updated successfully!' };
        } else {
          const message = response.data.message || 'Failed to update provider';
          setError(message);
          toast(<CustomErrorToast message={message} />);
          return { success: false, message };
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to update provider';
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
        return { success: false, message: errorMessage };
      } finally {
        setLoading(false);
      }
    };
  
    const resetSuccess = () => {
      setSuccess(false);
    };
  
    const customSetError = useCallback((message) => {
      setError(message);
    }, []);
  
    return {
      updateProvider,
      loading,
      error,
      success,
      resetSuccess,
      setError: customSetError,
    };
  };