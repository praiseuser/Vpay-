import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      CustomErrorToast('Authentication token is missing');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/get-transactions-overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.serviceSummary) {
        setTransactions(response.data.serviceSummary);
      } else {
        setTransactions([]);
        setError('No transactions data available');
        CustomErrorToast('No transactions data available');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch transactions';
      setError(errorMessage);
      CustomErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
};

export default useFetchTransactions;