import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { useUpdateSettings } from "../../../Hooks/useSetting";
import { useFetchSettings } from "../../../Hooks/useSetting";
import LogoSection from "../SettingsPage/LogoSection";
import SettingsForm from "../SettingsPage/SettingsForm";
import ActionButtons from "../SettingsPage/ActionButtons";
import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
} from "./SettingsPageStyles";

const SettingsPage = () => {
  const { updateSettings, isSaving } = useUpdateSettings();
  const { fetchSettings } = useFetchSettings();

  const [settings, setSettings] = useState({
    name: "",
    logo: null,
    email: "",
    phone: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    twitter: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (field) => (event) => {
    if (field === "logo") {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSettings((prev) => ({ ...prev, [field]: { file, url: imageUrl } }));
      }
    } else {
      setSettings((prev) => ({ ...prev, [field]: event.target.value || "" }));
    }
  };

  // Fetch settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const result = await fetchSettings(); // <-- call the fetch function
      if (result) {
        setSettings({
          name: result.name || "",
          logo: result.logo || null,
          email: result.email || "",
          phone: result.phone || "",
          facebook: result.facebook || "",
          instagram: result.instagram || "",
          linkedin: result.linkedin || "",
          youtube: result.youtube || "",
          twitter: result.twitter || "",
        });
        setIsEditing(true);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  // Handle save (update existing settings)
  const handleSave = async () => {
    setLoading(true);
    const success = await updateSettings(settings);
    setLoading(false);
    if (success) {
      setIsEditing(true);
    }
  };

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

        <ActionButtons
          isEditing={isEditing}
          isSaving={isSaving || loading}
          handleSave={handleSave}
        />
      </Grid>
    </Box>
  );
};

export default SettingsPage;
