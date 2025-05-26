import React from 'react';
import { Grid, Box, Typography, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { labelStyles } from '../SettingsPageStyles';

const LogoSection = ({ settings, handleChange }) => {
  return (
    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: 2 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={labelStyles}>Logo</Typography>
        <Box sx={{ position: 'relative', mt: 2 }}>
          <Avatar
            src={settings.logo?.url || settings.logo || ''}
            sx={{
              width: 200,
              height: 200,
              bgcolor: '#F5F6FA',
              border: '2px solid #E0E0E0',
              borderRadius: '50%',
            }}
          >
            {!(settings.logo?.url || settings.logo) && <PhotoCamera sx={{ fontSize: 60, color: '#4A85F6' }} />}
          </Avatar>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="logo-upload"
            type="file"
            onChange={handleChange('logo')}
          />
          <label htmlFor="logo-upload">
            <IconButton
              color="primary"
              component="span"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: '#fff',
                border: '2px solid #E0E0E0',
                borderRadius: '50%',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              <PhotoCamera sx={{ fontSize: 20 }} />
            </IconButton>
          </label>
        </Box>
      </Box>
    </Grid>
  );
};

export default LogoSection;