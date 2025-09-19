import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
import CustomErrorToast from '../components/CustomErrorToast';

export const useFetchUsers = (page = 1) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token is missing');
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users/all/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch users response:', response.data);

      const data = response.data.result || [];
      const formattedUsers = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id || null,
          firstname: item.firstname || 'N/A',
          lastname: item.lastname || 'N/A',
          email: item.email || 'N/A',
          status: item.status || 'N/A',
          phone: item.phone || 'N/A',
          gender: item.gender || 'N/A',
          created_at: item.created_at || null,
        }))
        : [];

      if (formattedUsers.length === 0) {
        setError('No users available');
        toast(<CustomErrorToast message="No users found" />);
      } else {
        setUsers(formattedUsers);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch users';
      console.error('Error fetching users:', err.response ? { status: err.response.status, data: err.response.data } : err.message);
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, fetchUsers };
};
export const useFetchUserById = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchUserById = useCallback(async () => {
    if (!id) return; // don't run if no ID

    setLoading(true);
    setError(null);

    if (!token) {
      const msg = 'Authentication token is missing';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetch user by ID response:', response.data);

      const result = response.data?.result;

      if (!result) {
        const msg = 'User not found';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setUser(null);
      } else {
        const data = Array.isArray(result) ? result[0] : result;

        const formattedUser = {
          id: data.id || null,
          firstname: data.firstname || 'N/A',
          lastname: data.lastname || 'N/A',
          email: data.email || 'N/A',
          status: data.status ?? 'N/A',
          phone: data.phone || 'N/A',
          gender: data.gender || 'N/A',
          created_at: data.created_at || null,
        };

        setUser(formattedUser);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch user';
      console.error(
        'Error fetching user by ID:',
        err.response ? { status: err.response.status, data: err.response.data } : err.message
      );
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    fetchUserById();
  }, [fetchUserById]);

  return { user, loading, error, fetchUserById };
};

export const useSearchUsers = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const searchUsers = useCallback(
    async (query) => {
      if (!query) return;

      setLoading(true);
      setError(null);

      if (!token) {
        const msg = 'Authentication token is missing';
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/admin/search/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            params: { query },
          }
        );

        console.log('Search users response:', response.data);

        const result = response.data?.result || [];

        const formattedResults = result.map((user) => ({
          id: user.id || null,
          firstname: user.firstname || 'N/A',
          lastname: user.lastname || 'N/A',
          email: user.email || 'N/A',
          phone: user.phone || 'N/A',
          gender: user.gender || 'N/A',
          status: user.status ?? 'N/A',
          created_at: user.created_at || null,
        }));

        setResults(formattedResults);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to search users';
        console.error(
          'Error searching users:',
          err.response ? { status: err.response.status, data: err.response.data } : err.message
        );
        setError(errorMessage);
        toast(<CustomErrorToast message={errorMessage} />);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { results, loading, error, searchUsers };
};
export const useFetchActiveUsers = (page = 1) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!token) {
      setError('Authentication token is missing');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users/active/${page}`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setUsers(response.data.result || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch active users');
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, fetchUsers };
};
export const useFetchBannedUsers = (page = 1) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!token) {
      setError('Authentication token is missing');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users/banned/${page}`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      setUsers(response.data.result || []);
    } catch (err) {
      setError(err.response?.status === 404 ? null : err.response?.data?.message || err.message || 'Failed to fetch banned users');
    } finally {
      setLoading(false);
    }
  }, [token, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, fetchUsers };
};