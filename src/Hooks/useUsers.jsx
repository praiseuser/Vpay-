import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import CustomErrorToast from "../components/CustomErrorToast";
import CustomSuccessToast from "../components/CustomSuccessToast";
import { useAuth } from "../context/AuthContext";
import updateConfig from "../utilities/updateConfig";

export const useFetchUsers = (page = 1) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Authentication token is missing");
      toast(<CustomErrorToast message="Authentication token is missing" />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/users/all/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetch users response:", response.data);

      const data = response.data.result || [];
      const formattedUsers = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id || null,
            firstname: item.firstname || "N/A",
            lastname: item.lastname || "N/A",
            email: item.email || "N/A",
            status: item.status || "N/A",
            phone: item.phone || "N/A",
            gender: item.gender || "N/A",
            created_at: item.created_at || null,
          }))
        : [];

      if (formattedUsers.length === 0) {
        setError("No users available");
        toast(<CustomErrorToast message="No users found" />);
      } else {
        setUsers(formattedUsers);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch users";
      console.error(
        "Error fetching users:",
        err.response
          ? { status: err.response.status, data: err.response.data }
          : err.message
      );
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
export const useGetUserById = (id) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/user/${id}`,
        config
      );
      const data = response.data;

      console.log("Fetched User Response:", data);

      if (data?.success || data?.code === 0) {
        setUserData(data.result[0] || null);
      } else {
        setUserData(null);
        CustomErrorToast(data?.message || "Failed to fetch user data!");
      }
    } catch (error) {
      console.error("Fetch User Error:", error);
      CustomErrorToast("Something went wrong while fetching user data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUserById();
  }, [id]);

  return { userData, loading, fetchUserById };
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
        const msg = "Authentication token is missing";
        setError(msg);
        toast(<CustomErrorToast message={msg} />);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/admin/search/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: { query },
        });

        console.log("Search users response:", response.data);

        const result = response.data?.result || [];

        const formattedResults = result.map((user) => ({
          id: user.id || null,
          firstname: user.firstname || "N/A",
          lastname: user.lastname || "N/A",
          email: user.email || "N/A",
          phone: user.phone || "N/A",
          gender: user.gender || "N/A",
          status: user.status ?? "N/A",
          created_at: user.created_at || null,
        }));

        setResults(formattedResults);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to search users";
        console.error(
          "Error searching users:",
          err.response
            ? { status: err.response.status, data: err.response.data }
            : err.message
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
      setError("Authentication token is missing");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/users/active/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data.result || []);
      console.log("Fetch active users response:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch active users"
      );
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
  const [bannedUsers, setBannedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchBannedUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/admin/users/banned/${page}`,
        config
      );
      setBannedUsers(Array.isArray(data?.result) ? data.result : []);
    } catch (err) {
      setBannedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannedUsers();
  }, [page]);

  return { bannedUsers, loading, refetch: fetchBannedUsers };
};
export const useSuspendUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useAuth();

  const suspendUser = async (id) => {
    const updatedConfig = updateConfig(config);
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/admin/user/suspend/${id}`,
        {},
        updatedConfig
      );
      console.log("Suspend User Response:", data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to suspend user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { suspendUser, loading, error };
};
export const useActivateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useAuth();

  const activateUser = async (id) => {
    const updatedConfig = updateConfig(config);
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/admin/user/activate/${id}`,
        {},
        updatedConfig
      );
      console.log("Activate User Response:", data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to suspend user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { activateUser, loading, error };
};
export const useGetUserAssets = (userId, network = "testnet") => {
  const [userAssets, setUserAssets] = useState({ crypto: [], fiat: [] });
  const [loading, setLoading] = useState(true);
  const { config } = useAuth();

  const fetchUserAssets = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/user-balances/${userId}/${network}`,
        config
      );
      const data = response.data;
      console.log("Response from server:", data);

      if (data?.success) {
        setUserAssets({
          crypto: data.result.crypto || [],
          fiat: data.result.fiat || [],
        });
      } else {
        setUserAssets({ crypto: [], fiat: [] });
        CustomErrorToast(data?.message || "Failed to fetch user assets!");
      }
    } catch (error) {
      console.error("Fetch User Assets Error:", error);
      CustomErrorToast("Something went wrong while fetching user assets!");
      setUserAssets({ crypto: [], fiat: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAssets();
  }, [userId, network]);

  return { userAssets, loading, fetchUserAssets };
};
