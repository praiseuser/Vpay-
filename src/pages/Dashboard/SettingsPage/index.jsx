import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { useUpdateSettings, useCreateSettings } from "../../../Hooks/useSetting";
import LogoSection from "../SettingsPage/LogoSection";
import SettingsForm from "../SettingsPage/SettingsForm";
import ActionButtons from "../SettingsPage/ActionButtons";
import PasswordModal from "../Card/PasswordModal";
import {
  pageStyles,
  titleStyles,
  cardStyles,
  headerBarStyles,
  sectionTitleStyles,
} from "./SettingsPageStyles";

const SettingsPage = () => {
  const { updateSettings, isSaving, error: updateError } = useUpdateSettings();
  const createSettings = useCreateSettings();

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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [activityPin, setActivityPin] = useState("");
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

  // Handle save (update existing settings)
  const handleSave = async () => {
    const success = await updateSettings(settings);
    if (success) toast.success("Settings updated successfully");
  };

  // Open password modal before creating settings
  const handleCreate = () => {
    setIsPasswordModalOpen(true);
  };

  // When password modal is submitted
  const handlePasswordSubmit = async () => {
    setLoading(true);
    try {
      // Build JSON payload
      const payload = {
        name: settings.name,
        email: settings.email,
        phone: settings.phone,
        facebook: settings.facebook,
        instagram: settings.instagram,
        linkedin: settings.linkedin,
        youtube: settings.youtube,
        twitter: settings.twitter,
        logo: null, // temporarily skip image to test JSON
      };

      console.log("Creating settings with payload:", payload);

      const response = await createSettings(payload, activityPin);
      if (response) {
        toast.success("Settings created successfully!");
        setIsEditing(true);
        setIsPasswordModalOpen(false);
        setActivityPin("");
      }
    } catch (err) {
      toast.error("Failed to create settings");
      console.error(err);
    } finally {
      setLoading(false);
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
          settings={settings}
          handleCreate={handleCreate}
          handleSave={handleSave}
        />
      </Grid>

      {/* 🔐 Password Modal */}
      {isPasswordModalOpen && (
        <PasswordModal
          open={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordSubmit}
          password={activityPin}
          setPassword={setActivityPin}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default SettingsPage;
