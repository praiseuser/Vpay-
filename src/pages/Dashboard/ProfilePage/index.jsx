import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, CircularProgress, Alert, Divider, Button } from '@mui/material';
import { ProfileCard, HeaderGradient, StyledAvatar, InfoRow, UpdateButton } from './styles';
import { useFetchProfile } from '../../../Hooks/useProfile';
import UpdateProfileModal from '../ProfilePage/UpdateProfileModal';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  const { profile, loading, error, success, updateProfile } = useFetchProfile();
  const [initials, setInitials] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (profile) {
      const firstInitial = profile.firstName?.charAt(0) || '';
      const lastInitial = profile.lastName?.charAt(0) || '';
      setInitials(`${firstInitial}${lastInitial}`);
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormErrors({});
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <CircularProgress size={60} color="primary" />
    </Box>
  );
  if (error) return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, background: '#ffffff', minHeight: '100vh' }}>
      <ProfileCard elevation={2}>
        <HeaderGradient>
          <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            User Profile
          </Typography>
        </HeaderGradient>
        <StyledAvatar>
          {initials || <PersonIcon sx={{ fontSize: 34 }} />}
        </StyledAvatar>
        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <InfoRow>
            <Typography className="label">First Name:</Typography>
            <Typography className="value">{profile?.firstName || 'N/A'}</Typography>
          </InfoRow>
          <Divider sx={{ my: 1, bgcolor: '#e0e0e0' }} />
          <InfoRow>
            <Typography className="label">Last Name:</Typography>
            <Typography className="value">{profile?.lastName || 'N/A'}</Typography>
          </InfoRow>
          <Divider sx={{ my: 1, bgcolor: '#e0e0e0' }} />
          <InfoRow>
            <Typography className="label">Phone:</Typography>
            <Typography className="value">{profile?.phone || 'N/A'}</Typography>
          </InfoRow>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <UpdateButton
            variant="contained"
            onClick={handleOpen}
          >
            Update Profile
          </UpdateButton>
        </Box>
      </ProfileCard>
      <UpdateProfileModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        updateProfile={updateProfile}
      />
    </Box>
  );
};

export default ProfilePage;