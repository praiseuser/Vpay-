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
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
                        Country_dial_code: item.country_dial_code || item.dial_code || item.phone_code || "N/A",
                        Country_Flag: item.country_flag || item.flag || "N/A",
                        status: item.status || "N/A",
                    }))
                    : [];

                if (formattedCurrencies.length === 0) {
                    setError("No country data available from the API");
                } else {
                    setCountryCurrencies(formattedCurrencies);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || "Failed to fetch country currencies";
                console.error("Error fetching countries:", errorMessage);
                setError(errorMessage);
                if (!hasFetched.current) toast.error(errorMessage);
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
    const [fiatCurrencies, setFiatCurrencies] = useState([]);
    const hasFetchedCurrencies = useRef(false);

    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const fetchFiatCurrencies = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("Fetching fiat currencies from:", `${API_BASE_URL}/admin/fiat-currencies`);
                const response = await axios.get(`${API_BASE_URL}/admin/fiat-currencies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log("Fiat currencies response:", response.data);
                const data = response.data.result || response.data || [];
                const formattedCurrencies = Array.isArray(data)
                    ? data.map((item) => ({
                        currency_id: String(item.id || item.currency_id || "Unknown"),
                        currency_name: item.fiat_currency || item.name || item.currency_name || "Unknown",
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
                    setFiatCurrencies(formattedCurrencies);
                    if (!hasFetchedCurrencies.current) {
                        toast.success("Fiat currencies loaded successfully");
                        hasFetchedCurrencies.current = true;
                    }
                }
            } catch (err) {
                const errorMessage =
                    err.response?.data?.message || err.message || "Failed to fetch fiat currencies";
                console.error("Fetch fiat currencies error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        console.log("Current token in useAddCountry:", token);
        if (token && !hasFetchedCurrencies.current) {
            fetchFiatCurrencies();
        } else if (!token) {
            console.warn("No token found");
            setError("Authentication token is missing");
            toast.error("Authentication token is missing");
            setLoading(false);
        }
    }, [token]);

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
                return response.data;
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

    return { addCountry, fiatCurrencies, loading, error, success };
};


const useDeleteCountry = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const token = useSelector((state) => state.user.token);

    const deleteCountry = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            console.warn("No token found in useDeleteCountry");
            setError("Authentication token is missing");
            setLoading(false);
            return;
        }

        if (!id) {
            console.warn("No country ID provided for deletion");
            setError("Country ID is required");
            setLoading(false);
            return;
        }

        try {
            console.log(`Attempting to delete country with ID: ${id}`);
            console.log(`Using API endpoint: ${API_BASE_URL}/admin/countries/delete/${id}`);

            const response = await axios.get(`${API_BASE_URL}/admin/countries/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Delete country response:", response.data);

            if (response.data.success) {
                setSuccess(true);
                toast.success("Country deleted successfully!");
                console.log(`Country with ID ${id} deleted successfully`);
                return response.data;
            } else {
                const message = response.data.message || "Failed to delete country";
                setError(message);
                console.error("Failed to delete country:", message);
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to delete country";
            console.error("Error deleting country:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
        } finally {
            setLoading(false);
            console.log("Delete country operation completed. Loading:", false);
        }
    };

    return { deleteCountry, loading, error, success };
};


const useViewCountryById = () => {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetchedId, setLastFetchedId] = useState(null);

    const token = useSelector((state) => state.user.token);

    const viewCountry = async (id) => {
        if (lastFetchedId === id && country) {
            console.log(`Country with ID ${id} already fetched, using cached data`);
            return country;
        }

        setLoading(true);
        setError(null);

        if (!token) {
            console.warn("No token found in useViewCountryById");
            setError("Authentication token is missing");
            toast.error("Authentication token is missing");
            setLoading(false);
            return;
        }

        if (!id) {
            console.warn("No country ID provided for viewing");
            setError("Country ID is required");
            toast.error("Country ID is required");
            setLoading(false);
            return;
        }

        try {
            console.log(`Attempting to view country with ID: ${id}`);
            console.log(`Using API endpoint: ${API_BASE_URL}/admin/countries/view/${id}`);

            const response = await axios.get(`${API_BASE_URL}/admin/countries/view/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("View country response:", response.data);

            const data = response.data.result || response.data || {};
            if (response.data.success) {
                const formattedCountry = {
                    id: data.id || "Unknown",
                    Currency_Id: data.currency_id || data.currency || "Unknown",
                    Country_name: data.country_name || data.name || "Unknown",
                    Country_code: data.country_code || data.code || "N/A",
                    Country_dial_code: data.country_dial_code || data.dial_code || data.phone_code || "N/A",
                    Country_Flag: data.country_flag || data.flag || "N/A",
                    status: data.status || "N/A",
                };

                console.log(`Setting country for ID ${id}:`, formattedCountry);
                setCountry(formattedCountry);
                setLastFetchedId(id);
                console.log(`Country with ID ${id} retrieved`);
                return formattedCountry;
            } else {
                setCountry(null); // Reset only if the API indicates failure
                const message = response.data.message || "Failed to retrieve country";
                setError(message);
                toast.error(message);
                console.error("Failed to retrieve country:", message);
            }
        } catch (err) {
            setCountry(null); // Reset on error
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to retrieve country";
            console.error("Error retrieving country:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            console.log("View country operation completed. Loading:", false);
        }
    };

    return { viewCountry, country, loading, error };
};

export { useFetchCountryCurrencies, useAddCountry, useDeleteCountry, useViewCountryById };