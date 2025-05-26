import React from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import styles from '../AddCryptoPageStyles';

const CryptoFormFields = ({ formData, errors, handleChange }) => {
  const networkOptions = ['mainnet', 'testnet'];
  const statusOptions = ['Active'];

  return (
    <Box sx={styles.inputFields}>
      <Box sx={styles.fieldContainer}>
        <Typography sx={styles.fieldLabel}>
          Cryptocurrency
        </Typography>
        <TextField
          name="selectedCrypto"
          value={formData.selectedCrypto}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter cryptocurrency..."
          error={!!errors.selectedCrypto}
          helperText={errors.selectedCrypto}
          sx={styles.textField}
        />
      </Box>

      <Box sx={styles.fieldContainer}>
        <Typography sx={styles.fieldLabel}>
          Select Network
        </Typography>
        <TextField
          select
          name="selectedNetwork"
          value={formData.selectedNetwork}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Choose..."
          error={!!errors.selectedNetwork}
          helperText={errors.selectedNetwork}
          sx={styles.textField}
        >
          <MenuItem value="">Choose...</MenuItem>
          {networkOptions.map((network) => (
            <MenuItem key={network} value={network}>
              {network}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={styles.fieldContainer}>
        <Typography sx={styles.fieldLabel}>
          Status
        </Typography>
        <TextField
          select
          name="status"
          value={formData.status}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={styles.textField}
          error={!!errors.status}
          helperText={errors.status}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default CryptoFormFields;