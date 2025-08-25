import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import customErrorToast from '../components/CustomErrorToast';
import customSuccessToast from '../components/CustomSuccessToast';

const useCreateFeeCurrency = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const userState = useSelector((state) => state.user);
    const token = userState?.token || localStorage.getItem('token');

    const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
    const VALID_FEE_TYPES = ['percentage', 'fixed'];

    const createFiatCurrency = async (fiatData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            setError('Authentication token not found');
            customErrorToast('Please log in to create a fee');
            setLoading(false);
            return;
        }

        if (!fiatData.fee_name || !VALID_FEE_NAMES.includes(fiatData.fee_name)) {
            setError('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            customErrorToast('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            setLoading(false);
            return;
        }

        if (!fiatData.fee_type || !VALID_FEE_TYPES.includes(fiatData.fee_type)) {
            setError('Fee type must be either percentage or fixed');
            customErrorToast('Fee type must be either percentage or fixed');
            setLoading(false);
            return;
        }

        if (!fiatData.fee_amount || typeof fiatData.fee_amount !== 'number' || fiatData.fee_amount <= 0) {
            setError('Fee amount must be a positive number');
            customErrorToast('Fee amount must be a positive number');
            setLoading(false);
            return;
        }

        if (fiatData.has_max_limit && (!fiatData.max_limit || typeof fiatData.max_limit !== 'number' || fiatData.max_limit <= 0)) {
            setError('Max limit is required and must be a positive number when Has Max Limit is true');
            customErrorToast('Max limit is required and must be a positive number when Has Max Limit is true');
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

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/create`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setSuccess(true);
            customSuccessToast('Fee created successfully');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to create fee';
            setError(errorMessage);
            customErrorToast(errorMessage);
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

    const fetchFees = async () => {
        if (!token) {
            setError('Authentication token not found');
            customErrorToast('Please log in to view fees');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/admin/transaction-fees`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setFees(response.data.result || []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch fees';
            setError(errorMessage);
            customErrorToast(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchFees();
        } else {
            setError('Authentication token not found');
            customErrorToast('Please log in to view fees');
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
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            setError('Authentication token not found');
            customErrorToast('Please log in to update a fee');
            setLoading(false);
            return;
        }

        if (!id) {
            setError('No fee ID provided');
            customErrorToast('No fee ID provided');
            setLoading(false);
            return;
        }

        if (!feeData.fee_name || !VALID_FEE_NAMES.includes(feeData.fee_name)) {
            setError('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            customErrorToast('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
            setLoading(false);
            return;
        }

        if (!feeData.fee_type || !VALID_FEE_TYPES.includes(feeData.fee_type)) {
            setError('Fee type must be either percentage or fixed');
            customErrorToast('Fee type must be either percentage or fixed');
            setLoading(false);
            return;
        }

        if (!feeData.fee_amount || typeof feeData.fee_amount !== 'number' || feeData.fee_amount <= 0) {
            setError('Fee amount must be a positive number');
            customErrorToast('Fee amount must be a positive number');
            setLoading(false);
            return;
        }

        if (feeData.has_max_limit && (!feeData.max_limit || typeof feeData.max_limit !== 'number' || feeData.max_limit <= 0)) {
            setError('Max limit is required and must be a positive number when Has Max Limit is true');
            customErrorToast('Max limit is required and must be a positive number when Has Max Limit is true');
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

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/update/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setSuccess(true);
            customSuccessToast('Fee updated successfully');
            return response.data;
        } catch (err) {
            let errorMessage = 'Something went wrong while updating the fee';
            if (err.response) {
                if (err.response.status === 404) errorMessage = 'Fee not found';
                else if (err.response.status === 401) errorMessage = 'Unauthorized: Invalid or expired token';
                else errorMessage = err.response?.data?.message || err.message || errorMessage;
            } else {
                errorMessage = err.message || errorMessage;
            }
            setError(errorMessage);
            customErrorToast(errorMessage);
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
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        setError(null);
        setSuccessMessage(null);

        if (!token) {
            setError('Authentication token not found');
            customErrorToast('Please log in to delete a fee');
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return;
        }

        if (!id) {
            setError('No fee ID provided');
            customErrorToast('No fee ID provided');
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/delete/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Transaction fee deleted successfully!');
            customSuccessToast('Transaction fee deleted successfully!');
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return response.data;
        } catch (err) {
            let errorMessage = 'Something went wrong while deleting the transaction fee';
            if (err.response) {
                errorMessage = err.response?.data?.message || err.message || errorMessage;
            } else {
                errorMessage = err.message || errorMessage;
            }
            setError(errorMessage);
            customErrorToast(errorMessage);
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
            return null;
        }
    }, [token]);

    const isFeeLoading = (feeId) => !!loadingStates[feeId];

    return { deleteTransactionFee, isFeeLoading, error, successMessage };
};

export { useCreateFeeCurrency, useFetchFees, useUpdateFee, useDeleteTransactionFee };