import axios from 'axios';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config/path';
import { toast } from 'react-toastify';
import CustomErrorToast from '../components/CustomErrorToast';
import CustomSuccessToast from '../components/CustomSuccessToast';


export const useAddRolesPermission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user?.user || state.auth?.user);

  const addRolesPermission = async (adminData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!token) {
      const msg = 'Authentication token is missing';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
      setLoading(false);
      return;
    }

    if (!adminData.admin_type_id) {
      const msg = 'Admin type ID is required';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
      setLoading(false);
      return;
    }

    const payload = {
      admin_type_id: adminData.admin_type_id,
      admin_id: user?.id || user?._id || '',
      create: !!adminData.create,
      read: !!adminData.read,
      update: !!adminData.update,
      delete: !!adminData.delete,
      status:
        adminData.status === '1' ||
          adminData.status === 1 ||
          adminData.status === true
          ? '1'
          : '0',
    };

    if (!payload.admin_id) {
      const msg = 'Admin ID is missing from user state';
      setError(msg);
      toast(<CustomErrorToast message={msg} />);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/role-permission/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        toast(<CustomSuccessToast message="Role permissions added successfully!" />);
        return response.data;
      } else {
        const message = response.data.message || 'Failed to add role permissions';
        setError(message);
        toast(<CustomErrorToast message={message} />);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to add role permissions';
      setError(errorMessage);
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  };

  return { addRolesPermission, loading, error, success };
};
export const useFetchAdmin = (refreshTrigger) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const hasFetched = useRef(false);

  const token = useSelector((state) => state.user.token);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      console.warn("No token found in useFetchAdmin");
      setError("Authentication token is missing");
      toast.error("Authentication token is missing");
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching admins from: ${API_BASE_URL}/admin/admins`);
      const response = await axios.get(`${API_BASE_URL}/admin/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setResponseData(response.data);

      console.log("Full server response:", response.data);

      const data = response.data.result || response.data || [];
      const formattedAdmins = Array.isArray(data)
        ? data.map((item) => ({
          id: item.id || item._id || null,
          admin_id: item.admin_id || item.id || null,
          firstname: item.firstname || "",
          lastname: item.lastname || "",
          email: item.email || "",
          phone: item.phone || "",
          gender: item.gender || "",
          country_name: item.country_name || "",
          admin_types: item.admin_types || [],
        }))
        : [];


      if (formattedAdmins.length === 0) {
        setError("No admin data available");
        toast.info("No admins found");
        setAdmins([]);
      } else {
        setAdmins(formattedAdmins);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch admin data";
      console.error(
        "Error fetching admins:",
        err.response ? { status: err.response.status, data: err.response.data } : err.message
      );
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log("Fetch admin operation completed.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdmins();
      hasFetched.current = true;
    }
  }, [token, refreshTrigger]);

  return { admins, loading, error, responseData, refetch: fetchAdmins };
};
export const useAddAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [adminTypes, setAdminTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const token = useSelector((state) => state.user.token);

  const fetchAdminTypes = async () => {
    setLoadingTypes(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/admins/types`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Admin Types Response:', res.data);
      setAdminTypes(res.data.result || []);
    } catch (err) {
      console.error('Failed to fetch admin types:', err);
      toast(<CustomErrorToast message="Failed to load admin types" />);
    } finally {
      setLoadingTypes(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/countries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Countries Response:', res.data);
      setCountries(res.data.result || []);
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      toast(<CustomErrorToast message="Failed to load countries" />);
    }
  };

  const fetchAllDropdowns = async () => {
    await Promise.all([fetchAdminTypes(), fetchCountries()]);
  };

  useEffect(() => {
    if (token) {
      fetchAllDropdowns();
    }
  }, [token]);

  const addAdmin = async (adminData) => {
    setLoading(true);
    try {
      const payload = {
        ...adminData,
        country_id: String(adminData.country_id),
        sub_role: adminData.sub_role.map(String),
      };

      const res = await axios.post(
        `${API_BASE_URL}/admin/admins/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const successMessage = res.data?.message || 'Admin added successfully!';
      toast(<CustomSuccessToast message={successMessage} />);

      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add admin';
      toast(<CustomErrorToast message={errorMessage} />);
    } finally {
      setLoading(false);
    }
  };

  return {
    addAdmin,
    loading,
    adminTypes,
    countries,
    loadingTypes,
  };
};
export const useFetchAdminPermissions = (adminId) => {
  const token = useSelector((state) => state.user.token);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!adminId || !token || isNaN(Number(adminId))) {
        setPermissions({});
        setLoading(false);
        console.warn("Invalid adminId or missing token", { adminId, token });
        return;
      }

      console.log("Fetching permissions for adminId:", adminId);

      const res = await axios.get(
        `${API_BASE_URL}/admin/role-permissions/${adminId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const dataArray = Array.isArray(res.data.result) ? res.data.result : [];

      const sortedData = [...dataArray].sort((a, b) => {
        const aDate = new Date(a.updated_at).getTime();
        const bDate = new Date(b.updated_at).getTime();

        if (bDate !== aDate) return bDate - aDate;

        const score = (perm) =>
          [perm.create, perm.read, perm.update, perm.delete].filter(Boolean)
            .length;

        return score(b) - score(a);
      });

      const uniquePermissionsMap = {};
      for (const perm of sortedData) {
        if (!uniquePermissionsMap[perm.id]) {
          uniquePermissionsMap[perm.id] = perm;
        }
      }

      const permObj = {};
      Object.values(uniquePermissionsMap).forEach((perm) => {
        const permId = String(perm.id);
        permObj[permId] = {
          create: Boolean(perm.create),
          read: Boolean(perm.read),
          update: Boolean(perm.update),
          delete: Boolean(perm.delete),
          status: Boolean(perm.status),
          admin_type_id: Number(perm.admin_type_id),
          id: Number(perm.id),
          checked: false,
        };
      });

      console.log("Parsed permissions for adminId:", adminId, permObj);
      setPermissions(permObj);
    } catch (err) {
      setError(err.message || "Failed to fetch permissions");
      console.error(
        "Fetch error:",
        adminId,
        err.response?.status,
        err.response?.data,
        err.message
      );
      toast(<CustomErrorToast message="Failed to fetch admin permissions." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [adminId, token]);

  return {
    permissions,
    setPermissions,
    loading,
    error,
    refetchPermissions: fetchPermissions,
  };
};
export const useUpdateAdminPermissions = (adminId, permissions, setPermissions) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.user.token);

  const handlePermissionChange = (moduleName, perm, value) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [perm]: value,
      },
    }));
  };

  const handleAdminTypeToggle = (moduleName, isEnabled) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        checked: isEnabled,
      },
    }));
  };

  const updatePermissions = (formattedPermissions) => {
    return async (accountPassword) => {
      setIsUpdating(true);
      setError(null);

      try {
        const permissionsPayload = {};

        Object.values(formattedPermissions).forEach((value) => {
          if (value?.admin_type_id) {
            permissionsPayload[value.admin_type_id] = {
              create: Boolean(value.create),
              read: Boolean(value.read),
              update: Boolean(value.update),
              delete: Boolean(value.delete),
            };
          }
        });

        console.log("Admin ID (param now):", adminId);
        console.log("Final Permissions Payload:", permissionsPayload);

        const response = await axios.post(
          `${API_BASE_URL}/admin/admin/role-permission/update/${adminId}`,
          permissionsPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "account-password": accountPassword,
            },
          }
        );

        console.log("Update success:", response.data);
        setIsUpdating(false);
        return true;
      } catch (err) {
        if (err.response) {
          console.error("Server error:", err.response.data);
          setError(err.response.data?.message || "Failed to update permissions.");
        } else if (err.request) {
          console.error("No response:", err.request);
          setError("No response from server.");
        } else {
          console.error("Unexpected error:", err.message);
          setError("Unexpected error occurred.");
        }

        setIsUpdating(false);
        return false;
      }
    };
  };

  return {
    isUpdating,
    error,
    handlePermissionChange,
    handleAdminTypeToggle,
    updatePermissions,
  };
};
export const usePermissions = () => {
  const token = useSelector((state) => state.user.token);

  const [adminTypes, setAdminTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [typesError, setTypesError] = useState(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAdminTypes = async () => {
    setLoadingTypes(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/admins/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Full admin types response:', response.data);

      const types = Array.isArray(response.data)
        ? response.data
        : response.data.adminTypes || response.data.data || [];

      setAdminTypes(types);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to fetch admin types';
      console.error('Error fetching admin types:', errorMsg);
      setTypesError(errorMsg);
      toast(<CustomErrorToast message={errorMsg} />);
    } finally {
      setLoadingTypes(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminTypes();
    }
  }, [token]);

  const createPermission = async (payload) => {
    setCreateLoading(true);
    setCreateError(null);
    setSuccessMessage('');

    if (!payload || !payload.admin_id) {
      const errorMsg = 'admin_id is required in payload';
      console.error('Payload validation failed:', errorMsg, payload);
      setCreateError(errorMsg);
      toast(<CustomErrorToast message={errorMsg} />);
      throw new Error(errorMsg);
    }

    console.log('Sending createPermission request with payload:', payload);
    console.log('Validating admin_id:', payload.admin_id);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/role-permission/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Permission created response:', response.data);

      const successMsg = response.data?.message || 'Permission created successfully';
      setSuccessMessage(successMsg);
      toast(<CustomSuccessToast message={successMsg} />);

      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to create permission';
      console.error('Error creating permission:', message, error.response?.data);
      setCreateError(message);
      toast(<CustomErrorToast message={message} />);
      throw new Error(message);
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    adminTypes,
    loadingTypes,
    typesError,
    createPermission,
    createLoading,
    createError,
    successMessage,
  };
};
export const useFetchAllRoles = () => {
  const token = useSelector((state) => state.user.token);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoles = useCallback(async () => {
    if (!token) {
      setRoles([]);
      setLoading(false);
      setError("No token provided");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/admin/admins/types`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Roles API raw response:", response.data);

      const result = Array.isArray(response.data.result) ? response.data.result : [];
      setRoles(result);
    } catch (err) {
      console.error("Failed to fetch roles:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch roles");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading, error, refetch: fetchRoles };
};
