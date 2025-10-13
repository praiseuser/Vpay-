import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { useAuth } from '../context/AuthContext';
import updateConfig from '../utilities/updateConfig';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';

const useFetchFiatCurrencies = () => {
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;


  const fetchFiat = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      console.log("Fiat currencies response:", response.data);
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

      setFiatCurrencies(formattedCurrencies);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch fiat currencies';
      setError(errorMessage);
      CustomErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initially if not fetched
  useEffect(() => {
    if (token && !hasFetched.current) {
      fetchFiat();
      hasFetched.current = true;
    }
  }, [token]);

  return { fiatCurrencies, loading, error, fetchFiat }; // <-- return the fetch function
};
const useCreateFiatCurrency = () => {
  const { config } = useAuth();

  return async (formData, activityPin) => {
    const updatedConfig = updateConfig(config, activityPin);
    console.log("Creating crypto with data:", formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/fiat-currency/create`,
        formData,
        updatedConfig
      );

      CustomSuccessToast(response.data.message);
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

const useUpdateFiat = () => {
  const { config } = useAuth();

  return async (id, formData, activityPin) => {
    try {
      const updatedConfig = updateConfig(config, activityPin)
      const response = await axios.post(
        `${API_BASE_URL}/admin/fiat-currency/update/${id}`,
        formData,
        updatedConfig
      );
      const result = response.data
      if (result?.error === 0) {
        CustomSuccessToast(result.message)
      }
      if (result?.error) {
        toast.error(result?.message)
        return false
      }
    } catch (error) {
      console.error("Error:", error)
      if (error?.response?.data) {
        CustomErrorToast(error.response.data.message)
      } else {
        CustomErrorToast("An error occurred!")
      }
    }
  };
};


export { useFetchFiatCurrencies, useCreateFiatCurrency, useUpdateFiat };