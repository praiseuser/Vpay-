import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ProfileHeader = ({ profile, statusDotStyles, sectionTitleStyles }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
    <Box sx={{ position: 'relative', mr: 2 }}>
      <Avatar
        src={profile.profilePicture}
        sx={{
          width: 80,
          height: 80,
          bgcolor: '#02042D',
          transition: 'transform 0.3s ease',
        }}
      >
        {!profile.profilePicture && profile.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={statusDotStyles} />
    </Box>
    <Box>
      <Typography sx={sectionTitleStyles}>Admin Details</Typography>
      <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#666' }}>
        Manage your admin profile information
      </Typography>
    </Box>
  </Box>
);

export default ProfileHeader;