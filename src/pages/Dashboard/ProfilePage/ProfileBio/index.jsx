import React from 'react';
import { Box, Typography } from '@mui/material';

const ProfileBio = ({ bio, bioStyles }) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={bioStyles}>{bio || 'No bio provided.'}</Typography>
  </Box>
);

export default ProfileBio;