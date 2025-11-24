import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import updateConfig from "../utilities/updateConfig";
import { useAuth } from "../context/AuthContext";
import CustomSuccessToast from "../components/CustomSuccessToast";
import CustomErrorToast from "../components/CustomErrorToast";

export const useFetchSettings = () => {
  const { config } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/settings`, config);
      setSettings(res.data.result || res.data);
      console.log("Settings Fetched:", res.data);
    } catch (err) {
      CustomErrorToast("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { settings, fetchSettings, loading };
};
export const useUpdateSettings = () => {
  const { config } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateSettings = async (data, pin) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "logo" && value instanceof File) {
        formData.append("logo", value);
      } else if (value != null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/settings/update`,
        formData,
        updateConfig(config, pin)
      );

      CustomSuccessToast("Settings updated!");
      return res.data.result || res.data;
    } catch (err) {
      CustomErrorToast(err.response?.data?.message || "Update failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateSettings, loading };
};
