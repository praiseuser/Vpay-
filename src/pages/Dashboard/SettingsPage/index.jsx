import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Avatar,
  Skeleton,
  Typography,
  Paper,
} from "@mui/material";
import { useFetchSettings } from "../../../Hooks/useSetting";

const Settings = () => {
  const {
    settings,
    fetchSettings,
    loading: loadingSettings,
  } = useFetchSettings();

  const [formValues, setFormValues] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setFormValues(settings);
      setLogoPreview(settings.logo || null);
    }
  }, [settings]);

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 4, border: "1px solid #e0e0e0" }}
    >
      <Typography variant="h6" fontWeight={600} mb={3} color="primary">
        Settings
      </Typography>

      {/* SAME GRID LAYOUT FOR LOADING AND LOADED — PERFECT ALIGNMENT */}
      <Grid container spacing={4}>
        {/* LOGO SECTION — ALWAYS LEFT */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {loadingSettings ? (
              <Skeleton variant="circular" width={160} height={160} />
            ) : (
              <Avatar
                src={logoPreview || "/default-logo.png"}
                sx={{
                  width: 160,
                  height: 160,
                  mb: 2,
                  border: "5px solid #eee",
                }}
              />
            )}
            {loadingSettings ? (
              <Skeleton variant="text" width={120} height={30} sx={{ mt: 1 }} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Company Logo
              </Typography>
            )}
          </Box>
        </Grid>

        {/* TEXT FIELDS — ALWAYS RIGHT */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {[
              ["name", "Site Name"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["twitter", "Twitter"],
              ["linkedin", "LinkedIn"],
              ["youtube", "YouTube"],
              ["facebook", "Facebook"],
              ["instagram", "Instagram"],
            ].map(([key, label]) => (
              <Grid item xs={12} sm={6} key={key}>
                {loadingSettings ? (
                  <Skeleton variant="rectangular" height={56} />
                ) : (
                  <TextField
                    fullWidth
                    label={label}
                    value={formValues[key] || "—"}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Settings;
