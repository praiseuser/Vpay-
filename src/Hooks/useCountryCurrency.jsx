import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

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
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Fetched country currencies data:", response.data);

                const data = response.data.result || response.data || [];
                const formattedCurrencies = Array.isArray(data)
                    ? data.map((item) => ({
                        id: item.id || "Unknown",
                        Currency_Id: item.currency_id || item.currency || "Unknown",
                        Country_name: item.country_name || item.name || "Unknown",
                        Country_code: item.country_code || item.code || "N/A",
                        Country_dial_code: item.country_dial_code || item.dial_code || item.phone_code || "N/A", // Added dial code
                        Country_Flag: item.country_flag || item.flag || "N/A",
                        status: item.status || "N/A",
                      }))
                    : [];

                if (formattedCurrencies.length === 0) {
                    setError("No country data available from the API");
                } else {
                    setCountryCurrencies(formattedCurrencies);
                    if (!hasFetched.current) {
                        toast.success("Country currencies found");
                        hasFetched.current = true;
                    }
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || "Failed to fetch country currencies";
                console.error("Error fetching countries:", errorMessage);
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        console.log("Current token in useFetchCountryCurrencies:", token);
        if (token && !hasFetched.current) {
            fetchCountryCurrencies();
        } else if (!token) {
            console.warn("No token found");
            setLoading(false);
        }
    }, [token]);

    return { countryCurrencies, loading, error };
};


const useAddCountry = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const token = useSelector((state) => state.user.token);
  
    const addCountry = async (countryData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      try {
        const response = await axios.post(
          `${API_BASE_URL}/admin/countries/create`,
          countryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.data.success) {
          setSuccess(true);
          toast.success('Country added successfully!');
          return response.data; // You can return the new country data if needed
        } else {
          const message = response.data.message || 'Failed to add country';
          setError(message);
          toast.error(message);
        }
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || 'Failed to add country';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
  
    return { addCountry, loading, error, success };
  };

export  {useFetchCountryCurrencies, useAddCountry};