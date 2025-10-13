import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Divider, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import styles from '../AddCryptoPageStyles';

const CryptoFormFields = ({ formData, errors, handleChange }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const networkOptions = ['mainnet', 'testnet'];
  const statusOptions = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '0' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      handleChange({ target: { name: 'cryptoImage', files: [file] } });
    }
  };

  return (
    <Box sx={{
      ...styles.inputFields,
      width: '100%',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E0E0E0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h5" sx={{ fontFamily: 'Mada, sans-serif', color: '#1A237E', mb: 2 }}>
        Add New Crypto
      </Typography>
      <Divider sx={{ borderColor: '#D3D3D3', mb: 2 }} />

      <Grid container spacing={2}>
        {/* Crypto Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Crypto Name"
            name="crypto_name"
            value={formData.crypto_name || ''}
            onChange={handleChange}
            fullWidth
            placeholder="Enter crypto name..."
            error={!!errors.crypto_name}
            helperText={errors.crypto_name}
          />
        </Grid>

        {/* Crypto Symbol */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Crypto Symbol"
            name="crypto_symbol"
            value={formData.crypto_symbol || ''}
            onChange={handleChange}
            fullWidth
            placeholder="Enter symbol (e.g., BTC)"
            error={!!errors.crypto_symbol}
            helperText={errors.crypto_symbol}
          />
        </Grid>

        {/* Crypto Image */}
        <Grid item xs={12} md={6}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {imagePreview && (
            <Box mt={2}>
              <img src={imagePreview} alt="Preview" width={120} height={120} />
            </Box>
          )}
        </Grid>

        {/* Chain */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Chain"
            name="chain"
            value={formData.chain || ''}
            onChange={handleChange}
            fullWidth
            placeholder="Enter chain (e.g., Ethereum)"
            error={!!errors.chain}
            helperText={errors.chain}
          />
        </Grid>

        {/* Network */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Select Network"
            name="selectedNetwork"
            value={formData.selectedNetwork || ''}
            onChange={handleChange}
            fullWidth
            error={!!errors.selectedNetwork}
            helperText={errors.selectedNetwork}
          >
            <MenuItem value="">Choose...</MenuItem>
            {networkOptions.map((network) => (
              <MenuItem key={network} value={network}>{network}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Status */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status || '1'}
            onChange={handleChange}
            fullWidth
            error={!!errors.status}
            helperText={errors.status}
          >
            <MenuItem value="">Choose...</MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

CryptoFormFields.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CryptoFormFields;
