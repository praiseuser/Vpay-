import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

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

        console.log("Fetched data:", response.data);

        const data = response.data.result || response.data || [];
        setCryptoCurrencies(Array.isArray(data) ? data : []);

      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch crypto currencies";
        console.error("Error fetching crypto:", errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    console.log("Current token in useFetchCurrencies:", token);
    if (token && !hasFetched.current) {
      fetchCryptoCurrencies();
    } else if (!token) {
      console.warn("No token found");
      setLoading(false);
    }

    return () => {
      hasFetched.current = false;
    };
  }, [token]);

  return { cryptoCurrencies, loading, error };
};

const useCreateCryptoCurrency = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const createCryptoCurrency = async (cryptoData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/crypto-currency/create`, cryptoData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Created crypto currency:", response.data);

      setSuccess(true);
      toast.success("Crypto currency created successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create crypto currency";
      console.error("Error creating crypto:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createCryptoCurrency, loading, error, success };
};

const useEditFiatStatus= () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const editCurrency = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/crypto-currency/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Updated crypto currency:", response.data);

      const message = response.data.message || "Cryptocurrency updated successfully";
      setSuccess(true);
      setSuccessMessage(message);
      toast.success(message);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update cryptocurrency";
      console.error("Error updating crypto:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editCurrency, loading, error, success, successMessage };
};

export { useFetchCurrencies, useCreateCryptoCurrency, useEditFiatStatus };