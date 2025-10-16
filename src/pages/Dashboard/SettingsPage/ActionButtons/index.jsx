import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { buttonStyles } from "../SettingsPageStyles";

const ActionButtons = ({ isEditing, isSaving, handleCreate, handleSave, settings }) => {
  const onCreateClick = () => {
    if (!settings || typeof settings !== "object" || Object.keys(settings).length === 0)
      return console.error("Settings data is missing or invalid");

    // Build plain JSON payload (not FormData)
    const payload = {
      name: settings.name || "",
      logo: null, // backend expects null if no file
      phone: settings.phone || "",
      email: settings.email || "",
      twitter: settings.twitter || "",
      linkedin: settings.linkedin || "",
      youtube: settings.youtube || "",
      facebook: settings.facebook || "",
      instagram: settings.instagram || "",
    };

    console.log("🚀 Sending JSON payload:", payload);

    handleCreate(payload);
  };


  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: 2,
          bgcolor: "#fff",
          borderTop: "1px solid #e0e0e0",
          position: "sticky",
          bottom: 0,
          zIndex: 1000,
          minHeight: 60,
        }}
      >
        {!isEditing && (
          <Button
            variant="contained"
            onClick={onCreateClick}
            disabled={isSaving}
            sx={buttonStyles.create}
          >
            {isSaving ? "Creating..." : "Create"}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving || !isEditing}
          sx={buttonStyles.save}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Grid>
  );
};

export default ActionButtons;
