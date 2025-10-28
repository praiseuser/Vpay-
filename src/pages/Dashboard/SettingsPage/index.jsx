import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useUpdateSettings, useFetchSettings } from "../../../Hooks/useSetting";
import LogoSection from "./LogoSection";
import SettingsForm from "./SettingsForm";
import ActionButtons from "./ActionButtons";
import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
} from "./SettingsPageStyles";

const SettingsPage = () => {
  const { updateSettings, loading: saving } = useUpdateSettings();
  const { fetchSettings, loading: fetching } = useFetchSettings();

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

useEffect(() => {
  let isMounted = true;

  (async () => {
    const result = await fetchSettings();
    if (isMounted && result) {
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
  })();

  return () => { isMounted = false; };
  // 👇 ADD THIS DEPENDENCY SAFELY
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [fetchSettings]);


  const handleSave = async () => {
    const success = await updateSettings(settings);
    if (success) setIsEditing(true);
  };

  console.log("🔴 About to render - settings:", settings);

  return (
    <Box sx={pageStyles}>
      <Typography sx={titleStyles}>Settings</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={cardStyles}>
            <Box sx={headerBarStyles} />
            <Typography sx={sectionTitleStyles}>General Settings</Typography>
            <Grid container spacing={4}>
              <div>TEST - No components yet</div>
              {/* <LogoSection settings={settings} handleChange={handleChange} /> */}
              {/* <SettingsForm settings={settings} handleChange={handleChange} /> */}
            </Grid>
          </Box>
        </Grid>

        {/* <ActionButtons
          isEditing={isEditing}
          isSaving={saving || fetching}
          handleSave={handleSave}
        /> */}
        <div>ActionButtons commented out</div>
      </Grid>
    </Box>
  );
};

export default SettingsPage;