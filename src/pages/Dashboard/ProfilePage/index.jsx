import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useFetchProfile } from '../../../Hooks/useProfile';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  background: '#fff',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ProfilePage = () => {
  const { profile, loading, error, success } = useFetchProfile();
  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (profile) {
      const firstInitial = profile.firstName?.charAt(0) || ''; // Updated to firstName
      const lastInitial = profile.lastName?.charAt(0) || '';   // Updated to lastName
      setInitials(`${firstInitial}${lastInitial}`);
      console.log('Profile in component:', profile); // Debug log in component
    }
  }, [profile]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress size={60} />
    </Box>
  );
  if (error) return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{ p: 4, background: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#333', textAlign: 'center' }}>
        User Profile
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 3, bgcolor: '#1976d2', fontSize: 40 }}
            >
              {initials}
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1, color: '#1976d2' }}>
              {profile?.username || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, color: '#666' }}>
              ID: {profile?.id || 'N/A'}
            </Typography>
            <Box sx={{ textAlign: 'left', mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>First Name:</strong> {profile?.firstName || 'N/A'} // Updated to firstName
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Last Name:</strong> {profile?.lastName || 'N/A'}   // Updated to lastName
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {profile?.email || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1}}>
                <strong>Phone:</strong> {profile?.phone || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Gender:</strong> {profile?.gender || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Country ID:</strong> {profile?.country_id || 'N/A'}
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;