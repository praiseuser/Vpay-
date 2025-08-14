import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
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
      console.warn('No token found in useFetchTransactions'); 
      setError('Authentication token is missing');
      toast.error('Authentication token is missing');
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching transactions from: ${API_BASE_URL}/admin/get-transactions-overview`);
      const response = await axios.get(`${API_BASE_URL}/admin/get-transactions-overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Transactions response:', response.data);
      if (response.data.serviceSummary) {
        setTransactions(response.data.serviceSummary);
      } else {
        setTransactions([]);
        console.warn('No serviceTransactions found in response');
        toast.info('No transactions data available');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch transactions';
      console.error('Error fetching transactions:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log('Fetch operation completed. Loading:', false);
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
};

export default useFetchTransactions;