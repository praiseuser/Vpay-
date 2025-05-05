import React from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';
import styles from '../AddCryptoPageStyles';

const CryptoFormFields = ({ formData, errors, handleChange }) => {
  const cryptoOptions = ['Bitcoin', 'Ethereum', 'USDT', 'Binance', 'Solana', 'Polygon'];
  const networkOptions = ['BEP20', 'ERC20', 'TRC20', 'Polygon', 'Solana'];
  const statusOptions = ['Active', 'Disabled'];

  return (
    <>
      <Box sx={styles.fieldContainer}>
        <Typography sx={styles.fieldLabel}>
          Select Cryptocurrency
        </Typography>
        <TextField
          select
          name="selectedCrypto"
          value={formData.selectedCrypto}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Choose..."
          error={!!errors.selectedCrypto}
          helperText={errors.selectedCrypto}
          sx={styles.textField}
        >
          <MenuItem value="">Choose...</MenuItem>
          {cryptoOptions.map((crypto) => (
            <MenuItem key={crypto} value={crypto}>
              {crypto}
            </MenuItem>
          ))}
        </TextField>
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
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
};

export default CryptoFormFields;