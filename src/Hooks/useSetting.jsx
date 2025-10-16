import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import updateConfig from "../utilities/updateConfig";
import { useAuth } from "../context/AuthContext";
import CustomSuccessToast from "../components/CustomSuccessToast";
import CustomErrorToast from "../components/CustomErrorToast";

const useFetchSettings = () => {
  const { config } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/settings`, updateConfig(config));
      setSettings(response.data);

      CustomSuccessToast("Settings fetched successfully!");
      return response.data;

    } catch (error) {
      console.error("Error fetching settings:", error);
      CustomErrorToast(error?.response?.data?.message || "Failed to fetch settings");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, fetchSettings };
};
const useCreateSettings = () => {
  const { config } = useAuth();

  return async (payload, activityPin) => {
    try {
      const updatedConfig = updateConfig(config, activityPin);

      const response = await axios.post(
        `${API_BASE_URL}/admin/settings/create`,
        payload,
        updatedConfig
      );

      console.log("Final data sent:", payload);
      CustomSuccessToast(response.data.message || "Settings created successfully!");
      return response.data;
    } catch (error) {
      console.error("Error creating settings:", error?.response?.data || error);
      CustomErrorToast(error?.response?.data?.message || "Failed to create settings");
    }
  };
};


const useUpdateSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const updateSettings = async (settings) => {
    if (!token) {
      setError("No token found, please log in");
      toast.error("No token found, please log in");
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      console.log("Updating settings to:", `${API_BASE_URL}/admin/settings/update`);
      const formData = new FormData();
      formData.append('name', settings.name || '');
      formData.append('email', settings.email || '');
      formData.append('phone', settings.phone || '');
      formData.append('facebook', settings.facebook || '');
      formData.append('linkedin', settings.linkedin || '');
      formData.append('instagram', settings.instagram || '');
      formData.append('youtube', settings.youtube || '');

      if (settings.logo && settings.logo.file) {
        formData.append('logo', settings.logo.file);
      }

      const response = await axios.post(`${API_BASE_URL}/admin/settings/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Update response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Settings updated successfully");
        return true;
      } else {
        throw new Error(response.data.message || "Failed to update settings");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update settings";
      console.error("Update error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);

      if (errorMessage.toLowerCase().includes("no fields to update")) {
        toast.success("Settings updated successfully");
        return true;
      } else {
        setError(errorMessage);
        toast.error(`Error: ${errorMessage}`);
        return false;
      }
    } finally {
      setIsSaving(false);
    }
  };

  return { updateSettings, isSaving, error };
};

export { useFetchSettings, useUpdateSettings, useCreateSettings };