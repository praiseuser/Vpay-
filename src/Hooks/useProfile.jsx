import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

export const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setError('Authentication token missing');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const userData = response.data.result || {};
      const processedProfile = {
        firstName: userData.firstname || userData.firstName || 'N/A',
        lastName: userData.lastname || userData.lastName || 'N/A',
        phone: userData.phone || 'N/A',
      };

      setProfile(processedProfile);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch profile';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};
