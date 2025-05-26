import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { labelStyles, textFieldStyles } from '../SettingsPageStyles';

const SettingsForm = ({ settings, handleChange }) => {
  return (
    <Grid item xs={12} md={8}>
      <Grid container spacing={2}>
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
              />
            </Grid>
          </Grid>
        </Grid>

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
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>YouTube</Typography>
              <TextField
                fullWidth
                value={settings.youtube}
                onChange={handleChange('youtube')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter YouTube URL"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Facebook</Typography>
              <TextField
                fullWidth
                value={settings.facebook}
                onChange={handleChange('facebook')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter Facebook URL"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyles}>Instagram</Typography>
              <TextField
                fullWidth
                value={settings.instagram}
                onChange={handleChange('instagram')}
                sx={textFieldStyles}
                variant="outlined"
                placeholder="Enter Instagram URL"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyles}>LinkedIn</Typography>
          <TextField
            fullWidth
            value={settings.linkedin}
            onChange={handleChange('linkedin')}
            sx={textFieldStyles}
            variant="outlined"
            placeholder="Enter LinkedIn URL"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;