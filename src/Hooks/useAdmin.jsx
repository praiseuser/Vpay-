import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';

const useAddAdminType = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const token = useSelector((state) => state.user.token);
  
    const addAdminType = async (adminData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      if (!token) {
        console.warn('No token found in useAddAdminType');
        const msg = 'Authentication token is missing';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      if (!adminData.admin_type) {
        console.warn('No admin_type provided');
        const msg = 'Admin type is required';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      try {
        console.log(`Attempting to add admin type with data:`, adminData);
        const response = await axios.post(
          `${API_BASE_URL}/admin/admins/type/create`,
          { admin_type: adminData.admin_type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Add admin type response:', response.data);
  
        if (response.data.success) {
          setSuccess(true);
          toast(<CustomSuccessToast message="Admin type added successfully!" />);
          console.log('Admin type added successfully');
          return response.data;
        } else {
          const message = response.data.message || 'Failed to add admin type';
          setError(message);
          toast(<CustomErrorToast message={message} />);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to add admin type';
        console.error(
          'Error adding admin type:',
          err.response ? { status: err.response.status, data: err.response.data } : err.message
        );
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
      } finally {
        setLoading(false);
        console.log('Add admin type operation completed. Loading:', false);
      }
    };
  
    return { addAdminType, loading, error, success };
  };
const useFetchAdminTypes = () => {
    const [adminTypes, setAdminTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const token = useSelector((state) => state.user.token);

    const fetchAdminTypes = async () => {
        setLoading(true);
        setError(null);

        if (!token) {
            console.warn('No token found in useFetchAdminTypes');
            setError('Authentication token is missing');
            toast.error('Authentication token is missing');
            setLoading(false);
            return;
        }

        try {
            console.log(`Fetching admin types from: ${API_BASE_URL}/admin/admins/types`);
            const response = await axios.get(`${API_BASE_URL}/admin/admins/types`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Fetched admin types response:', response.data);

            const data = response.data.result || response.data || [];
            const formattedAdminTypes = Array.isArray(data)
                ? data.map((item) => ({
                    id: item.id || item._id || null,
                    admin_type: item.admin_type || 'Unknown',
                }))
                : [];

            if (formattedAdminTypes.length === 0) {
                setError('No admin types available');
                toast.info('No admin types found');
            } else {
                setAdminTypes(formattedAdminTypes);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch admin types';
            console.error('Error fetching admin types:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            console.log('Fetch admin types operation completed. Loading:', false);
        }
    };

    useEffect(() => {
        if (token && !hasFetched.current) {
            fetchAdminTypes();
        }
    }, [token]);

    return { adminTypes, loading, error, refetch: fetchAdminTypes };
};

const useViewAdminTypeById = () => {
    const [adminType, setAdminType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const token = useSelector((state) => state.user.token);
  
    const viewAdminType = async (id) => {
      setLoading(true);
      setError(null);
      setAdminType(null);
  
      if (!token) {
        console.warn('No token found in useViewAdminTypeById');
        const msg = 'Authentication token is missing';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      if (!id) {
        console.warn('No admin type ID provided');
        const msg = 'Admin type ID is required';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      try {
        console.log(`Attempting to view admin type with ID: ${id}`);
        console.log(`Request URL: ${API_BASE_URL}/admin/admins/type/view/${id}`);
        console.log(`Request Headers:`, { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
  
        const response = await axios.get(`${API_BASE_URL}/admin/admins/type/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Full server response:', response.data);
  
        const resultArray = response.data.result || [];
        const data = resultArray[0] || {};
        const adminTypeValue = data.admin_type || 'Unknown';
  
        if (response.data.success) {
          setAdminType({ admin_type: adminTypeValue });
          console.log(`Admin type with ID ${id} retrieved:`, { admin_type: adminTypeValue });
        } else {
          const message = data.message || 'Failed to retrieve admin type';
          setError(message);
          toast(<CustomErrorToast message={message} />);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to retrieve admin type';
        console.error(
          'Error viewing admin type:',
          err.response ? { status: err.response.status, data: err.response.data } : err.message
        );
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
      } finally {
        setLoading(false);
        console.log('View admin type operation completed. Loading:', false);
      }
    };
  
    return { viewAdminType, adminType, loading, error };
  };

const useDeleteAdminType = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const token = useSelector((state) => state.user.token);

    const deleteAdminType = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (!token) {
            console.warn('No token found in useDeleteAdminType');
            setError('Authentication token is missing');
            toast.error('Authentication token is missing');
            setLoading(false);
            return;
        }

        if (!id) {
            console.warn('No admin type ID provided');
            setError('Admin type ID is required');
            toast.error('Admin type ID is required');
            setLoading(false);
            return;
        }

        try {
            console.log(`Attempting to delete admin type with ID: ${id}`);
            console.log(`Request URL: ${API_BASE_URL}/admin/admins/type/delete/${id}`);
            console.log(`Request Headers:`, { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

            const response = await axios.get(`${API_BASE_URL}/admin/admins/type/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Delete admin type response:', response.data);

            if (response.data.success) {
                setSuccess(true);
                toast.success('Admin type deleted successfully!');
                console.log(`Admin type with ID ${id} deleted successfully`);
            } else {
                const message = response.data.message || 'Failed to delete admin type';
                setError(message);
                toast.error(message);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to delete admin type';
            console.error('Error deleting admin type:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            console.log('Delete admin type operation completed. Loading:', false);
        }
    };

    const resetSuccess = () => {
        console.log('Resetting delete success state');
        setSuccess(false);
    };

    return { deleteAdminType, loading, error, success, resetSuccess };
};

const useUpdateAdminType = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const token = useSelector((state) => state.user.token);
  
    const updateAdminType = async (id, updatedData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      if (!token) {
        console.warn('No token found in useUpdateAdminType');
        const msg = 'Authentication token is missing';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      if (!id) {
        console.warn('No admin type ID provided');
        const msg = 'Admin type ID is required';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }
  
      try {
        console.log(`Attempting to update admin type with ID: ${id}`);
        console.log(`Request URL: ${API_BASE_URL}/admin/admins/type/update/${id}`);
        console.log(`Request Headers:`, { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
        console.log(`Request Body:`, updatedData);
  
        const response = await axios.post(
          `${API_BASE_URL}/admin/admins/type/update/${id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        console.log('Update admin type response:', response.data);
  
        if (response.data.success) {
          setSuccess(true);
          toast(<CustomSuccessToast message="Admin type updated successfully!" />);
          console.log(`Admin type with ID ${id} updated successfully`);
        } else {
          const message = response.data.message || 'Failed to update admin type';
          setError(message);
          toast(<CustomErrorToast message={message} />);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to update admin type';
        console.error(
          'Error updating admin type:',
          err.response ? { status: err.response.status, data: err.response.data } : err.message
        );
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
      } finally {
        setLoading(false);
        console.log('Update admin type operation completed. Loading:', false);
      }
    };
  
    const resetSuccess = () => {
      console.log('Resetting update success state');
      setSuccess(false);
    };
  
    return { updateAdminType, loading, error, success, resetSuccess };
  };
  
export { useAddAdminType, useFetchAdminTypes, useViewAdminTypeById, useDeleteAdminType, useUpdateAdminType };