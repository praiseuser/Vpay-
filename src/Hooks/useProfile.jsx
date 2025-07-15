import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify'; 
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';

export const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Server response:', response.data); // Log the full server response
        const userData = response.data.result[0] || {};
        console.log('Raw userData:', userData); // Log raw userData before processing
        const processedProfile = {
          id: userData.id || null,
          firstName: userData.firstName || userData.firstname || null, // Adjusted for schema
          lastName: userData.lastName || userData.lastname || null,    // Adjusted for schema
          email: userData.email || null,
          phone: userData.phone || null,
          gender: userData.gender || null,
          country_id: userData.country_id || null,
          username: userData.username || null,
        };
        setProfile(processedProfile);
        console.log('Processed profile:', processedProfile); // Log the processed profile state
        setSuccess(true);
        toast(<CustomSuccessToast message="Profile fetched successfully!" />);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile(); 
  }, [token]);

  return { profile, loading, error, success };
};