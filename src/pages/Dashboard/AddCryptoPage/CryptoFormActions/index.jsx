import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import styles from '../AddCryptoPageStyles';

const CryptoFormActions = ({ onCancel, onSubmit, loading, error }) => {
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
    </Box>
  );
};

export default CryptoFormActions;