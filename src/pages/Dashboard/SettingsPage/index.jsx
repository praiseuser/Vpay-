import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';

import { useUpdateSettings } from '../../../Hooks/useSetting';
import LogoSection from '../SettingsPage/LogoSection';
import SettingsForm from '../SettingsPage/SettingsForm';
import ActionButtons from '../SettingsPage/ActionButtons';
import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles
} from './SettingsPageStyles';

const SettingsPage = () => {
  const { updateSettings, isSaving, error: updateError } = useUpdateSettings();

  const [settings, setSettings] = useState({
    name: 'My Website',
    logo: null,
    email: 'info@mywebsite.com',
    phone: '1234567890',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const [isEditing, setIsEditing] = useState(true); // Assume editing mode by default

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  const handleChange = (field) => (event) => {
    if (field === 'logo') {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSettings((prevSettings) => ({
          ...prevSettings,
          [field]: { file, url: imageUrl },
        }));
      }
    } else {
      setSettings((prevSettings) => ({
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
      toast.success("Settings updated successfully");
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

      toast.success("Settings created successfully");
      setIsEditing(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create settings";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  if (updateError) return <div>Error: {updateError}</div>;

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
