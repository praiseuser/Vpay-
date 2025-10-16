import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useUpdateSettings, useFetchSettings } from '../../../../Hooks/useSetting';
import LogoSection from '../LogoSection';
import SettingsForm from '../SettingsForm';
import ActionButtons from "../ActionButtons";
import PasswordModal from "../../Card/PasswordModal";

import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
} from '../SettingsPageStyles'

const SettingsPage = () => {
  const { updateSettings, loading: isSaving } = useUpdateSettings();
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
  const [openModal, setOpenModal] = useState(false); // ✅ controls modal

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
      const result = await fetchSettings();
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

  // ✅ Open modal when Save is clicked
  const handleSave = () => {
    setOpenModal(true);
  };

  // ✅ Called after user enters activity pin
  const handleConfirmSave = async (activityPin) => {
    setOpenModal(false);
    setLoading(true);
    const success = await updateSettings(settings, activityPin);
    setLoading(false);
    if (success) setIsEditing(true);
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
          handleSave={handleSave} // ✅ now opens modal
        />
      </Grid>

      {/* ✅ Password modal */}
      <PasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmSave} // callback after entering pin
      />
    </Box>
  );
};

export default SettingsPage;
