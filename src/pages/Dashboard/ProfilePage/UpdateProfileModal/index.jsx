import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { StyledDialog, StyledTextField } from '../styles'

const UpdateProfileModal = ({ open, handleClose, formData, setFormData, formErrors, setFormErrors, updateProfile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await updateProfile(formData);
    setIsSubmitting(false);
    if (!result.success) {
      setFormErrors(result.errors);
      return;
    }
    handleClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1565c0' }}>
        Update Profile
      </DialogTitle>
      <DialogContent>
        <StyledTextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={!!formErrors.firstName}
          helperText={formErrors.firstName}
          margin="normal"
        />
        <StyledTextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={!!formErrors.lastName}
          helperText={formErrors.lastName}
          margin="normal"
        />
        <StyledTextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
          margin="normal"
        />
        {formErrors.general && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formErrors.general}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={handleClose}
          sx={{ color: '#444', textTransform: 'none', fontFamily: 'Inter, sans-serif' }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1565c0',
            color: '#fff',
            textTransform: 'none',
            fontFamily: 'Inter, sans-serif',
            '&:hover': { backgroundColor: '#1976d2' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Save'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default UpdateProfileModal;