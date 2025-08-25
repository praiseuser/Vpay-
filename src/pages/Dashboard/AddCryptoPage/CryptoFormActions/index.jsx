import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import PasswordModal from '../../Card/PasswordModal';
import styles from '../AddCryptoPageStyles';

const CryptoFormActions = ({ 
  onCancel, 
  onSubmit, 
  loading, 
  error,
  showPasswordModal,
  setShowPasswordModal,
  handlePasswordSubmit,
  handlePasswordModalClose,
  accountPassword,
  setAccountPassword,
  passwordLoading
}) => {
  return (
    <Box sx={styles.buttonsContainer}>
      <Typography
        sx={styles.cancelText}
        onClick={onCancel}
      >
        Cancel
      </Typography>
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={styles.addButton}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Add Crypto'
        )}
      </Button>
      {error && (
        <Typography sx={{ color: 'red', fontSize: '12px', mt: 1 }}>
          {error}
        </Typography>
      )}
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
};

export default CryptoFormActions;