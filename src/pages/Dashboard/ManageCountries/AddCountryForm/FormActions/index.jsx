import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import PasswordModal from '../../../Card/PasswordModal';

const FormActions = ({ 
  onCancel, 
  loading,
  showPasswordModal,
  setShowPasswordModal,
  handlePasswordSubmit,
  handlePasswordModalClose,
  activityPin,
  setactivityPin,
  passwordLoading,
  error
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, px: 2 }}>
    <Typography
      onClick={onCancel}
      sx={{
        fontSize: '14px',
        color: '#6B7280',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        cursor: 'pointer',
        textDecoration: 'underline',
        '&:hover': {
          color: '#1E40AF',
        },
      }}
    >
      Cancel
    </Typography>
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
      startIcon={loading ? <CircularProgress color="inherit" size={16} /> : null}
      sx={{
        fontSize: '14px',
        padding: '8px 20px',
        background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
        color: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        borderRadius: 12,
        textTransform: 'none',
        '&:hover': {
          background: 'linear-gradient(45deg, #2563EB, #3B82F6)',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        },
      }}
    >
      {loading ? 'Adding...' : 'Submit'}
    </Button>
    <PasswordModal 
      open={showPasswordModal} 
      onClose={handlePasswordModalClose}
      onSubmit={handlePasswordSubmit}
      password={activityPin}
      setPassword={setactivityPin}
      loading={passwordLoading || loading}
      error={error}
    />
  </Box>
);

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showPasswordModal: PropTypes.bool.isRequired,
  setShowPasswordModal: PropTypes.func.isRequired,
  handlePasswordSubmit: PropTypes.func.isRequired,
  handlePasswordModalClose: PropTypes.func.isRequired,
  accountPassword: PropTypes.string.isRequired,
  setAccountPassword: PropTypes.func.isRequired,
  passwordLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default FormActions;