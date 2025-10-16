import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { labelStyles, textFieldStyles } from '../SettingsPageStyles';

const SettingsForm = ({ settings, handleChange }) => {
  return (
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
        {/* Name & Phone */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Name</Typography>
              <TextField
                fullWidth
                value={settings.name}
                onChange={handleChange('name')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter name"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Phone</Typography>
              <TextField
                fullWidth
                type="tel"
                value={settings.phone}
                onChange={handleChange('phone')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter phone number"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Email & YouTube */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Email</Typography>
              <TextField
                fullWidth
                type="email"
                value={settings.email}
                onChange={handleChange('email')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter email address"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>YouTube</Typography>
              <TextField
                fullWidth
                type="url"
                value={settings.youtube}
                onChange={handleChange('youtube')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter YouTube URL"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Facebook & Instagram */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Facebook</Typography>
              <TextField
                fullWidth
                type="url"
                value={settings.facebook}
                onChange={handleChange('facebook')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter Facebook URL"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Instagram</Typography>
              <TextField
                fullWidth
                type="url"
                value={settings.instagram}
                onChange={handleChange('instagram')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter Instagram URL"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Twitter & LinkedIn */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Twitter</Typography>
              <TextField
                fullWidth
                type="url"
                value={settings.twitter}
                onChange={handleChange('twitter')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter Twitter URL"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>LinkedIn</Typography>
              <TextField
                fullWidth
                type="url"
                value={settings.linkedin}
                onChange={handleChange('linkedin')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter LinkedIn URL"
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;
