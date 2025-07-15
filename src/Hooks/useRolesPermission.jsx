import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
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
          sub_role: item.sub_role || "",
          country_id: item.country_id || "",
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

export const useAdminPermissions = (adminId) => {
  const token = useSelector((state) => state.user.token);

  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/admin/role-permissions/${adminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Raw API response:', res.data.result);

        const dataArray = Array.isArray(res.data.result) ? res.data.result : [];

        const sortedData = [...dataArray].sort((a, b) => {
          const aDate = new Date(a.updated_at);
          const bDate = new Date(b.updated_at);

          if (bDate - aDate !== 0) return bDate - aDate;

          const getScore = (perm) =>
            [perm.create, perm.read, perm.update, perm.delete].filter(Boolean).length;

          const scoreDiff = getScore(b) - getScore(a);
          if (scoreDiff !== 0) return scoreDiff;

          if (b.create && !a.create) return 1;
          if (!b.create && a.create) return -1;

          return 0;
        });

        const uniquePermissionsMap = {};
        for (const perm of sortedData) {
          if (!uniquePermissionsMap[perm.admin_type]) {
            uniquePermissionsMap[perm.admin_type] = perm;
          }
        }

        const permObj = {};
        Object.values(uniquePermissionsMap).forEach((perm) => {
          const moduleName = perm.admin_type;
          permObj[moduleName] = {
            create: Boolean(perm.create),
            read: Boolean(perm.read),
            update: Boolean(perm.update),
            delete: Boolean(perm.delete),
            status: Boolean(perm.status),
            admin_type_id: Number(perm.admin_type_id),
            id: Number(perm.id || perm.admin_type_id),
            checked: true,
          };
        });

        console.log('Parsed permission object:', permObj);
        setPermissions(permObj);
      } catch (err) {
        setError(err);
        console.error('Fetch error:', err);
        toast(<CustomErrorToast message="Failed to fetch admin permissions." />);
      } finally {
        setLoading(false);
      }
    };

    if (adminId && token) {
      fetchPermissions();
    } else {
      setPermissions({});
      setLoading(false);
    }
  }, [adminId, token]);

  const handlePermissionChange = (module, action, value) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: value,
      },
    }));
  };

  const handleAdminTypeToggle = (module, checked) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        checked,
        ...(checked
          ? {}
          : {
              create: false,
              read: false,
              update: false,
              delete: false,
            }),
      },
    }));
  };

  // const updatePermissions = async (updatedPermissions) => {
  //   try {
  //     setIsUpdating(true);

  //     const permissionsPayload = {};

  //     Object.entries(updatedPermissions)
  //       .filter(([_, value]) => value.id && !isNaN(Number(value.id)))
  //       .forEach(([_, value]) => {
  //         permissionsPayload[Number(value.id)] = {
  //           create: Boolean(value.create),
  //           read: Boolean(value.read),
  //           update: Boolean(value.update),
  //           delete: Boolean(value.delete),
  //           status: Boolean(value.checked),
  //         };
  //       });

  //     console.log('🔁 Cleaned payload to send:', permissionsPayload);

  //     const res = await axios.post(
  //       `${API_BASE_URL}/admin/role-permission/update/${adminId}`,
  //       permissionsPayload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     console.log('Update response:', res.data);
  //     toast(<CustomSuccessToast message="Permissions updated successfully!" />);
  //   } catch (err) {
  //     console.log('Update error:', err.response?.data || err.message);
  //     setError(err);
  //     toast(<CustomErrorToast message="Failed to update admin permissions." />);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  return {
    permissions,
    loading,
    isUpdating,
    error,
    handlePermissionChange,
    handleAdminTypeToggle,
    // updatePermissions,
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

    console.log('📤 Sending createPermission request with payload:', payload);
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