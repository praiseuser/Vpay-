import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

const useCreateFeeCurrency = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');

    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];

    const createFiatCurrency = async (fiatData) => {
        console.log("createFiatCurrency called with data:", fiatData);

        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            console.warn("No token available for createFiatCurrency");
            setError("Authentication token not found");
            toast.error("Please log in to create a fee");
            setLoading(false);
            return;
        }

        if (!fiatData.fee_name || !VALID_FEE_NAMES.includes(fiatData.fee_name)) {
            console.log("Validation failed: Invalid fee name");
            setError('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            toast.error('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            setLoading(false);
            return;
        }

        if (!fiatData.fee_type || !VALID_FEE_TYPES.includes(fiatData.fee_type)) {
            console.log("Validation failed: Invalid fee type");
            setError('Fee type must be either percentage or fixed');
            toast.error('Fee type must be either percentage or fixed');
            setLoading(false);
            return;
        }

        if (!fiatData.fee_amount || typeof fiatData.fee_amount !== 'number' || fiatData.fee_amount <= 0) {
            console.log("Validation failed: Invalid fee amount");
            setError('Fee amount must be a positive number');
            toast.error('Fee amount must be a positive number');
            setLoading(false);
            return;
        }

        if (fiatData.has_max_limit && (!fiatData.max_limit || typeof fiatData.max_limit !== 'number' || fiatData.max_limit <= 0)) {
            console.log("Validation failed: Invalid max limit");
            setError('Max limit is required and must be a positive number when Has Max Limit is true');
            toast.error('Max limit is required and must be a positive number when Has Max Limit is true');
            setLoading(false);
            return;
        }


        const payload = {
            fee_name: fiatData.fee_name,
            fee_type: fiatData.fee_type,
            fee_amount: fiatData.fee_amount,
            status: fiatData.status,
            has_max_limit: fiatData.has_max_limit,
            max_limit: fiatData.has_max_limit ? fiatData.max_limit : null,
        };

        console.log("Payload being sent to API:", payload);

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/create`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Created fee response:", response.data);

            setSuccess(true);
            toast.success("Fee created successfully", { toastId: "create-fee-success" });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to create fee";
            console.error("Error creating fee:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage, { toastId: "create-fee-error" });
        } finally {
            setLoading(false);
        }
    };

    return { createFiatCurrency, loading, error, success };
};

const useFetchFees = () => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');

    console.log("useFetchFees - Token:", token);

    const fetchFees = async () => {
        console.log("fetchFees function called");
        if (!token) {
            console.warn("No token available for fetchFees");
            setError("Authentication token not found");
            toast.error("Please log in to view fees");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/admin/transaction-fees`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Fetched fees response:", response.data);
            setFees(response.data.result || []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch fees";
            console.error("Error fetching fees:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("useFetchFees useEffect triggered");
        if (token) {
            fetchFees();
        } else {
            console.warn("No token found in useFetchFees");
            setError("Authentication token not found");
            toast.error("Please log in to view fees");
        }
    }, [token]);

    return { fees, fetchFees, loading, error };
};

const useUpdateFee = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');

    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];

    const updateFee = useCallback(async (id, feeData) => {
        console.log('updateFee called with id:', id, 'data:', feeData);

        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            console.warn("No token available for updateFee");
            setError("Authentication token not found");
            toast.error("Please log in to update a fee", { toastId: "update-fee-no-token" });
            setLoading(false);
            return;
        }

        if (!id) {
            console.error("No fee ID provided for update");
            setError("No fee ID provided");
            toast.error("No fee ID provided", { toastId: "update-fee-no-id" });
            setLoading(false);
            return;
        }

        if (!feeData.fee_name || !VALID_FEE_NAMES.includes(feeData.fee_name)) {
            console.log("Validation failed: Invalid fee name");
            setError('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            toast.error('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout', {
                toastId: "update-fee-name-error",
            });
            setLoading(false);
            return;
        }

        if (!feeData.fee_type || !VALID_FEE_TYPES.includes(feeData.fee_type)) {
            console.log("Validation failed: Invalid fee type");
            setError('Fee type must be either percentage or fixed');
            toast.error('Fee type must be either percentage or fixed', {
                toastId: "update-fee-type-error",
            });
            setLoading(false);
            return;
        }

        if (!feeData.fee_amount || typeof feeData.fee_amount !== 'number' || feeData.fee_amount <= 0) {
            console.log("Validation failed: Invalid fee amount");
            setError('Fee amount must be a positive number');
            toast.error('Fee amount must be a positive number', {
                toastId: "update-fee-amount-error",
            });
            setLoading(false);
            return;
        }

        if (feeData.has_max_limit && (!feeData.max_limit || typeof feeData.max_limit !== 'number' || feeData.max_limit <= 0)) {
            console.log("Validation failed: Invalid max limit");
            setError('Max limit is required and must be a positive number when Has Max Limit is true');
            toast.error('Max limit is required and must be a positive number when Has Max Limit is true', {
                toastId: "update-fee-limit-error",
            });
            setLoading(false);
            return;
        }

        const payload = {
            fee_name: feeData.fee_name,
            fee_type: feeData.fee_type,
            fee_amount: feeData.fee_amount,
            status: feeData.status,
            has_max_limit: feeData.has_max_limit,
            max_limit: feeData.has_max_limit ? feeData.max_limit : null,
        };

        console.log('Sending update request with data:', payload);

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/update/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('useUpdateFee - Server response:', response.data);

            setSuccess(true);
            toast.success('Fee updated successfully', { toastId: 'update-fee-success' });
            return response.data;
        } catch (err) {
            let errorMessage = 'Something went wrong while updating the fee';
            if (err.response) {
                if (err.response.status === 404) {
                    errorMessage = 'Fee not found';
                } else if (err.response.status === 401) {
                    errorMessage = 'Unauthorized: Invalid or expired token';
                } else {
                    errorMessage = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : err.message) || errorMessage;
                }
            } else {
                errorMessage = err.message || errorMessage;
            }
            console.error('useUpdateFee - Error response:', errorMessage);
            console.error('useUpdateFee - Full error:', err);
            console.error('useUpdateFee - Error response details:', err.response);
            setError(errorMessage);
            toast.error(errorMessage, { toastId: 'update-fee-error' });
            setLoading(false);
            return null;
        } finally {
            setLoading(false);
        }
    }, [token]);

    return { updateFee, loading, error, success };
};

const useDeleteTransactionFee = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');

    const deleteTransactionFee = useCallback(async (id) => {
        console.log('useDeleteTransactionFee - API_BASE_URL:', API_BASE_URL);
        console.log('useDeleteTransactionFee - Token:', token);
        console.log('deleteTransactionFee called with id:', id);

        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        setError(null);
        setSuccessMessage(null);

        if (!token) {
            console.warn("No token available for deleteTransactionFee");
            setError("Authentication token not found");
            toast.error("Please log in to delete a fee");
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return;
        }

        if (!id) {
            console.error("No fee ID provided for deletion");
            setError("No fee ID provided");
            toast.error("No fee ID provided");
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return;
        }

        console.log('Sending delete request for id:', id);

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('useDeleteTransactionFee - Server response data:', response.data);
            console.log('useDeleteTransactionFee - Full response:', response);

            setSuccessMessage('Transaction fee deleted successfully!');
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            toast.success('Transaction fee deleted successfully!', { toastId: "delete-fee-success" });
            return response.data;
        } catch (err) {
            let errorMessage = 'Something went wrong while deleting the transaction fee';
            if (err.response) {
                errorMessage = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : err.message) || errorMessage;
            } else {
                errorMessage = err.message || errorMessage;
            }
            console.error('useDeleteTransactionFee - Error response:', errorMessage);
            console.error('useDeleteTransactionFee - Full error:', err);
            console.error('useDeleteTransactionFee - Error response details:', err.response);
            setError(errorMessage);
            toast.error(errorMessage, { toastId: "delete-fee-error" });
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return null;
        }
    }, [token]);
    const isFeeLoading = (feeId) => !!loadingStates[feeId];

    return { deleteTransactionFee, isFeeLoading, error, successMessage };
};

export { useCreateFeeCurrency, useFetchFees, useUpdateFee, useDeleteTransactionFee };