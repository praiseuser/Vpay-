import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../components/CustomSuccessToast';
import CustomErrorToast from '../components/CustomErrorToast';
import { API_BASE_URL } from '../config/path';

export const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.token);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.result || {};
      const processedProfile = {
        firstName: userData.firstname || userData.firstName || null,
        lastName: userData.lastname || userData.lastName || null,
        phone: userData.phone || null,
      };
      setProfile(processedProfile);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch profile';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const updateProfile = useCallback(async (formData) => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10-15 digits';
    }
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/profile/update`,
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          phone: formData.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast(<CustomSuccessToast message="Profile updated successfully!" />);
      await fetchProfile();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update profile';
      toast(<CustomErrorToast message={msg} />);
      return { success: false, errors: { general: msg } };
    }
  }, [token, fetchProfile]);

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('No authentication token found');
    }
  }, [token, fetchProfile]);

  return { profile, loading, error, success, refetch: fetchProfile, updateProfile };
};