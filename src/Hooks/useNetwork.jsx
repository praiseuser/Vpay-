import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';

export const useUpdateNetwork = () => {
  const [network, setNetwork] = useState('mainnet');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchNetwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const currentNetwork = response.data.result.network.toLowerCase();
        setNetwork(currentNetwork);
      } catch (err) {
        setError(err.message);
        toast(<CustomErrorToast message="Failed to load network" />);
        setNetwork('mainnet');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNetwork();
  }, [token]);

  const updateNetwork = async (newNetwork) => {
    const validNetworks = ['mainnet', 'testnet'];
    if (!validNetworks.includes(newNetwork.toLowerCase())) {
      const msg = 'Invalid network selection';
      setError('Invalid network. Use "mainnet" or "testnet".');
      toast(<CustomErrorToast message={msg} />);
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/update/network`,
        { network: newNetwork.toLowerCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNetwork(newNetwork.toLowerCase());
      toast(<CustomSuccessToast message="Network updated successfully" />);
      return true;
    } catch (err) {
      setError(err.message);
      toast(<CustomErrorToast message="Failed to update network" />);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { network, loading, error, updateNetwork };
};
