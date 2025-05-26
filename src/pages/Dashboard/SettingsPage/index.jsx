import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFetchSettings } from '../../../Hooks/useSetting';
import { useUpdateSettings } from '../../../Hooks/useSetting';
import LogoSection from '../SettingsPage/LogoSection';
import SettingsForm from '../SettingsPage/SettingsForm';
import ActionButtons from '../SettingsPage/ActionButtons';
import { pageStyles, titleStyles, cardStyles, headerBarStyles, sectionTitleStyles } from './SettingsPageStyles';

const SettingsPage = () => {
  const { settings: fetchedSettings, loading, error: fetchError, refetch } = useFetchSettings();
  const { updateSettings, isSaving, error: updateError } = useUpdateSettings();
  const [settings, setSettings] = useState({
    name: '',
    logo: null,
    email: '',
    phone: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  useEffect(() => {
    console.log("Fetched settings:", fetchedSettings);
    if (fetchedSettings && Object.keys(fetchedSettings).length > 0) {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...fetchedSettings,
        logo: fetchedSettings.logo ? { url: fetchedSettings.logo } : null,
      }));
      setIsEditing(true);
      console.log("Mode: Edit mode");
    } else {
      setIsEditing(false);
      console.log("Mode: Create mode");
    }
  }, [fetchedSettings]);

  const handleChange = (field) => (event) => {
    if (field === 'logo') {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSettings(prevSettings => ({
          ...prevSettings,
          [field]: { file, url: imageUrl },
        }));
      }
    } else {
      setSettings(prevSettings => ({
        ...prevSettings,
        [field]: event.target.value || '',
      }));
    }
  };

  const handleSave = async () => {
    if (!isEditing || !token) {
      toast.error("Invalid state or no token found, please log in");
      return;
    }

    const success = await updateSettings(settings);
    if (success) {
      console.log("Update successful, settings:", settings);
      toast.success("Settings updated successfully");
      refetch();
    }
  };

  const handleCreate = async () => {
    if (!token) {
      toast.error("No token found, please log in");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', settings.name);
      formData.append('email', settings.email);
      formData.append('phone', settings.phone);
      formData.append('facebook', settings.facebook);
      formData.append('linkedin', settings.linkedin);
      formData.append('instagram', settings.instagram);
      formData.append('youtube', settings.youtube);

      if (settings.logo && settings.logo.file) {
        formData.append('logo', settings.logo.file);
      }

      const response = await axios.post(`${API_BASE_URL}/v1/admin/settings`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Settings create response:", response.data);
      toast.success("Settings created successfully");
      setIsEditing(true);
      refetch();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create settings";
      console.error("Error creating settings:", err.response ? { status: err.response.status, data: err.response.data } : err.message);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  if (loading) return <div>Loading settings...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;
  if (updateError) return <div>Error: {updateError}</div>;

  console.log("Rendering buttons, isEditing:", isEditing, "isSaving:", isSaving);

  return (
    <Box sx={pageStyles}>
      <Typography sx={titleStyles}>Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={cardStyles}>
            <Box sx={headerBarStyles} />
            <Typography sx={sectionTitleStyles}>General Settings</Typography>
            <Grid container spacing={4}>
              <LogoSection settings={settings} handleChange={handleChange} />
              <SettingsForm settings={settings} handleChange={handleChange} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ActionButtons
            isEditing={isEditing}
            isSaving={isSaving}
            handleCreate={handleCreate}
            handleSave={handleSave}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;