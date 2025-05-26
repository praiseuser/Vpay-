import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../config/path";
import { toast } from "react-toastify";

const useFetchSettings = () => {
    const [settings, setSettings] = useState({
      logo: null,
      name: '',
      email: '',
      phone: '',
      facebook: '',
      youtube: '',
      instagram: '',
      linkedin: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);
  
    const userState = useSelector((state) => state.user);
    const token = userState.token;
  
    useEffect(() => {
      const fetchSettings = async () => {
        setLoading(true);
        setError(null);
  
        try {
          console.log("Fetching settings from:", `${API_BASE_URL}/admin/settings`);
          const response = await axios.get(`${API_BASE_URL}/admin/settings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log("Fetch response:", response.data);
          const data = response.data.result || response.data || {};
          const formattedSettings = {
            logo: data.logo || null,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            facebook: data.facebook || '',
            youtube: data.youtube || '',
            instagram: data.instagram || '',
            linkedin: data.linkedin || '',
          };
  
          if (Object.keys(formattedSettings).every(key => !formattedSettings[key])) {
            setError("No settings data available from the API");
          } else {
            setSettings(formattedSettings);
            if (!hasFetched.current) {
              toast.success("Settings Found");
              hasFetched.current = true;
            }
          }
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || "Failed to fetch settings";
          console.error("Fetch error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
          setError(errorMessage);
          toast.error(`Error: ${errorMessage}`);
        } finally {
          setLoading(false);
        }
      };
  
      console.log("Current token in useFetchSettings:", token);
      if (token && !hasFetched.current) {
        fetchSettings();
      } else if (!token) {
        console.warn("No token found");
        setLoading(false);
      }
    }, [token]);
  
    return { settings, loading, error };
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
        
        // Check if the response indicates success, even if the message says "no fields to update"
        if (response.status >= 200 && response.status < 300) {
          toast.success("Settings updated successfully");
          return true;
        } else {
          throw new Error(response.data.message || "Failed to update settings");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to update settings";
        console.error("Update error:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
        
        // Handle "no fields to update" as a success case if the backend still processes it
        if (errorMessage.toLowerCase().includes("no fields to update")) {
          toast.success("Settings updated successfully (no changes detected)");
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

export  { useFetchSettings, useUpdateSettings };