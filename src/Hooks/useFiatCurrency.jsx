import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

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

        console.log("Raw fiat currencies response:", response.data);

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
        const errorMessage = err.response?.data?.message || err.message || "Failed to fetch fiat currencies";
        setError(errorMessage);
        toast.error(errorMessage);
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

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const createFiatCurrency = async (fiatData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      ...fiatData,
      status: fiatData.status === 1 ? "1" : "0",
    };

    console.log("Payload being sent to API:", payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/fiat-currency/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Created fiat currency:", response.data);

      setSuccess(true);
      toast.success("Fiat currency created successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create fiat currency";
      console.error("Error creating fiat:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createFiatCurrency, loading, error, success };
};


export { useFetchFiatCurrencies, useCreateFiatCurrency, };