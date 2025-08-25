import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import PasswordModal from '../../../Card/PasswordModal';
import { actionsContainerStyle, submitButtonStyle } from '../countryFormStyles';

const FormActions = ({ 
  onCancel, 
  loading,
  showPasswordModal,
  setShowPasswordModal,
  handlePasswordSubmit,
  handlePasswordModalClose,
  accountPassword,
  setAccountPassword,
  passwordLoading,
  error
}) => (
  <Box sx={actionsContainerStyle}>
    <Typography
      onClick={onCancel}
      sx={{
        fontSize: '14px',
        color: '#2E3B55',
        fontFamily: 'Mada, sans-serif',
        fontWeight: 600,
        cursor: 'pointer',
        alignSelf: 'center',
        '&:hover': {
          textDecoration: 'underline',
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
      startIcon={loading ? <CircularProgress color="inherit" size={18} /> : null}
      sx={submitButtonStyle}
    >
      {loading ? 'Adding...' : 'Submit'}
    </Button>
    <PasswordModal 
      open={showPasswordModal} 
      onClose={handlePasswordModalClose}
      onSubmit={handlePasswordSubmit}
      password={accountPassword}
      setPassword={setAccountPassword}
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