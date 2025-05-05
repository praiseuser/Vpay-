import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from '../AddCryptoPageStyles';

const CryptoFormActions = ({ onCancel, onSubmit }) => {
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
      >
        Add Crypto
      </Button>
    </Box>
  );
};

export default CryptoFormActions;