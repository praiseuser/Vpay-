import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Box } from '@mui/material';


const CryptoFormInputs = ({ formData, errors, handleChange, networkOptions, statusOptions }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField
      name="crypto_name"
      label="Cryptocurrency"
      value={formData.crypto_name}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      error={!!errors.crypto_name}
      helperText={errors.crypto_name}
    />
    <TextField
      select
      name="network"
      label="Select Network"
      value={formData.network}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      error={!!errors.network}
      helperText={errors.network}
    >
      <MenuItem value="">Choose...</MenuItem>
      {networkOptions.map((network) => (
        <MenuItem key={network} value={network}>
          {network}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      select
      name="status"
      label="Status"
      value={formData.status}
      onChange={handleChange}
      variant="outlined"
      fullWidth
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
);

CryptoFormInputs.propTypes = {
  formData: PropTypes.shape({
    crypto_name: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    crypto_name: PropTypes.string,
    network: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  networkOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  statusOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CryptoFormInputs;