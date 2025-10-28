import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
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

  const fetchSettings = useCallback(async (showToast = false) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/settings`, updateConfig(config));
      console.log("✅ API response:", response.data);

      const result = response.data?.result || null;
      if (result) {
        setSettings(result);
        if (showToast) {
          CustomSuccessToast("Settings fetched successfully!");
        }
      } else {
        if (showToast) {
          CustomErrorToast("No settings data found.");
        }
      }

      return result;
    } catch (error) {
      console.error("❌ Error fetching settings:", error);
      if (showToast) {
        CustomErrorToast(error?.response?.data?.message || "Failed to fetch settings");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Empty dependency array

  return { settings, fetchSettings, loading };
};

const useUpdateSettings = () => {
  const { config } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateSettings = useCallback(async (newSettings, activityPin = null) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(newSettings).forEach(([key, value]) => {
        if (key === "logo" && value?.file) {
          formData.append("logo", value.file);
        } else {
          formData.append(key, value || "");
        }
      });

      const response = await axios.post(
        `${API_BASE_URL}/admin/settings/update`,
        formData,
        updateConfig(config, activityPin)
      );

      setSettings(response.data.result);
      CustomSuccessToast("Settings updated successfully!");
      return response.data.result;
    } catch (error) {
      console.error("Error updating settings:", error);
      CustomErrorToast(error?.response?.data?.message || "Failed to update settings");
      return null;
    } finally {
      setLoading(false);
    }
  }, [config]);

  return { settings, updateSettings, loading };
};



export { useFetchSettings, useUpdateSettings, };