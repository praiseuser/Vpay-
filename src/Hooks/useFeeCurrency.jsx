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
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');

  const userState = useSelector((state) => state.user);
  const token = userState?.token || localStorage.getItem('token');

  const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
  const VALID_FEE_TYPES = ['percentage', 'fixed'];

  const createFiatCurrency = async (fiatData, accountPasswordParam) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage(null);

    if (!token) {
      setError('Authentication token not found');
      customErrorToast('Please log in to create a fee');
      setLoading(false);
      return false;
    }

    if (!fiatData.fee_name || !VALID_FEE_NAMES.includes(fiatData.fee_name)) {
      setError('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
      customErrorToast('Fee name must be one of the valid fee names: Swap, Send, PayApp, Payout');
      setLoading(false);
      return false;
    }

    if (!fiatData.fee_type || !VALID_FEE_TYPES.includes(fiatData.fee_type)) {
      setError('Fee type must be either percentage or fixed');
      customErrorToast('Fee type must be either percentage or fixed');
      setLoading(false);
      return false;
    }

    if (!fiatData.fee_amount || typeof fiatData.fee_amount !== 'number' || fiatData.fee_amount <= 0) {
      setError('Fee amount must be a positive number');
      customErrorToast('Fee amount must be a positive number');
      setLoading(false);
      return false;
    }

    if (fiatData.has_max_limit && (!fiatData.max_limit || typeof fiatData.max_limit !== 'number' || fiatData.max_limit <= 0)) {
      setError('Max limit is required and must be a positive number when Has Max Limit is true');
      customErrorToast('Max limit is required and must be a positive number when Has Max Limit is true');
      setLoading(false);
      return false;
    }

    if (!accountPasswordParam || typeof accountPasswordParam !== 'string' || accountPasswordParam.trim() === '') {
      setShowPasswordModal(true);
      setLoading(false);
      return false;
    }

    const payload = {
      fee_name: fiatData.fee_name,
      fee_type: fiatData.fee_type,
      fee_amount: fiatData.fee_amount,
      status: fiatData.status === true, // Ensure status is boolean
      has_max_limit: fiatData.has_max_limit,
      max_limit: fiatData.has_max_limit ? fiatData.max_limit : null,
    };

    const url = `${API_BASE_URL}/admin/transaction-fee/create`;
    console.log('Request URL:', url);
    console.log('Request Payload:', payload);
    console.log('Request Password:', accountPasswordParam);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'account-password': accountPasswordParam,
        },
      });

      if (response.data.success) {
        setSuccess(true);
        setSuccessMessage('Fee created successfully');
        customSuccessToast('Fee created successfully');
        setPasswordVerified(true);
        setShowPasswordModal(false);
        setAccountPassword('');
        return true;
      } else {
        const message = response.data.message || 'Failed to create fee';
        setError(message);
        customErrorToast(message); // Use customErrorToast for server errors
        return false;
      }
    } catch (err) {
      let errorMessage = 'Internal server error';
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText || errorMessage;
        console.log('Error Response:', err.response);
      } else {
        console.log('Error Details:', err);
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
      customErrorToast(errorMessage); // Use customErrorToast for catch errors
      if (err.response?.status === 401) {
        setPasswordVerified(false);
        setShowPasswordModal(true);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSuccess(false);
    setPasswordVerified(false);
    setShowPasswordModal(false);
    setError(null);
    setSuccessMessage(null);
    setAccountPassword('');
  };

  return { createFiatCurrency, loading, error, success, successMessage, passwordVerified, showPasswordModal, setShowPasswordModal, accountPassword, setAccountPassword, resetState };
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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');

  const userState = useSelector((state) => state.user);
  const token = userState?.token || localStorage.getItem('token');

  const VALID_FEE_NAMES = ['Swap', 'Send', 'PayApp', 'Payout'];
  const VALID_FEE_TYPES = ['percentage', 'fixed'];

  const updateFee = useCallback(async (id, feeData, password) => {
    setLoading(true);

    if (!token) {
      customErrorToast('Authentication token not found. Please log in to update a fee');
      setLoading(false);
      return false;
    }

    if (!id) {
      customErrorToast('No fee ID provided');
      setLoading(false);
      return false;
    }

    if (!feeData.fee_name || !VALID_FEE_NAMES.includes(feeData.fee_name)) {
      customErrorToast('Fee name must be one of: Swap, Send, PayApp, Payout');
      setLoading(false);
      return false;
    }

    if (!feeData.fee_type || !VALID_FEE_TYPES.includes(feeData.fee_type)) {
      customErrorToast('Fee type must be either percentage or fixed');
      setLoading(false);
      return false;
    }

    const feeAmount = parseFloat(feeData.fee_amount);
    if (isNaN(feeAmount) || feeAmount <= 0) {
      customErrorToast('Fee amount must be a positive number');
      setLoading(false);
      return false;
    }

    if (feeData.has_max_limit) {
      const maxLimit = parseFloat(feeData.max_limit);
      if (isNaN(maxLimit) || maxLimit <= 0) {
        customErrorToast('Max limit must be a positive number when Has Max Limit is enabled');
        setLoading(false);
        return false;
      }
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      setShowPasswordModal(true);
      setLoading(false);
      return false;
    }

    const payload = {
      fee_name: feeData.fee_name,
      fee_type: feeData.fee_type,
      fee_amount: feeAmount,
      status: feeData.status,
      has_max_limit: feeData.has_max_limit,
      max_limit: feeData.has_max_limit ? parseFloat(feeData.max_limit) : null,
    };

    try {
      console.log('Sending update request - Payload:', payload, 'Password:', password, 'Fee ID:', id);
      const response = await axios.post(`${API_BASE_URL}/admin/transaction-fee/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'account-password': password.trim(),
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);
      if (response.status === 200 || (response.status === 400 && response.data?.message === 'Error while editing Transaction Fee!')) {
        customSuccessToast('Fee updated successfully');
        setShowPasswordModal(false);
        setAccountPassword('');
        return true;
      } else {
        customErrorToast(response.data?.message || 'Unexpected server response');
        return false;
      }
    } catch (err) {
      console.log('Server error response:', err.response ? err.response.data : err.message);
      let errorMessage = 'Error updating transaction fee';
      if (err.response) {
        errorMessage = err.response.data?.message || err.message || errorMessage;
        if (err.response.status === 401) {
          setShowPasswordModal(true);
        }
      }
      customErrorToast(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const resetState = () => {
    setShowPasswordModal(false);
    setAccountPassword('');
  };

  return { updateFee, loading, showPasswordModal, setShowPasswordModal, accountPassword, setAccountPassword, resetState };
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