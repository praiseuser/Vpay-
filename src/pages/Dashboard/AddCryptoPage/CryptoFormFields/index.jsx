import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Divider, Grid } from '@mui/material';
import styles from '../AddCryptoPageStyles';
import PropTypes from 'prop-types';

const CryptoFormFields = ({ formData, errors, handleChange }) => {
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const networkOptions = ['mainnet', 'testnet'];
  const statusOptions = ['Active'];

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      handleChange({ target: { name: 'cryptoImage', value: file } }); // Pass file to formData
    }
  };

  return (
    <Box
      sx={{
        ...styles.inputFields,
        width: '100%', // Full width without maxWidth cap
        margin: '0 auto', // Center the form
        padding: '24px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'opacity 0.3s ease',
        '&:hover': { opacity: 0.95 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontFamily: 'Mada, sans-serif', color: '#1A237E', mb: 2 }}
      >
        Add New Crypto
      </Typography>
      <Divider sx={{ borderColor: '#D3D3D3', mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Cryptocurrency</Typography>
            <TextField
              name="selectedCrypto"
              value={formData.selectedCrypto}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Enter cryptocurrency..."
              error={!!errors.selectedCrypto}
              helperText={errors.selectedCrypto}
              sx={{
                ...styles.textField,
                '& .MuiInputBase-root': {
                  backgroundColor: '#F5F5F5',
                  borderRadius: '6px',
                  padding: '12px', // Increased padding for larger size
                  fontSize: '16px', // Increased font size
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E0E0E0', borderWidth: '2px' }, // Thicker border
                  '&:hover fieldset': { borderColor: '#BBDEFB' },
                  '&.Mui-focused fieldset': { borderColor: '#BBDEFB' },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Crypto Symbol</Typography>
            <TextField
              name="cryptoSymbol"
              value={formData.cryptoSymbol || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Enter symbol (e.g., BTC)..."
              error={!!errors.cryptoSymbol}
              helperText={errors.cryptoSymbol}
              sx={{
                ...styles.textField,
                '& .MuiInputBase-root': {
                  backgroundColor: '#F5F5F5',
                  borderRadius: '6px',
                  padding: '12px', // Increased padding
                  fontSize: '16px', // Increased font size
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E0E0E0', borderWidth: '2px' }, // Thicker border
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Crypto Image</Typography>
            <Box sx={{ mb: 1 }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: '#26A69A',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  padding: '12px 16px', // Increased padding
                  fontSize: '16px', // Increased font size
                  '&:hover': { backgroundColor: '#00695C' },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '120px', height: '120px', borderRadius: '8px', objectFit: 'cover' }} // Increased size
                  />
                </Box>
              )}
            </Box>
            {errors.cryptoImage && <Typography color="error">{errors.cryptoImage}</Typography>}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Chain</Typography>
            <TextField
              name="chain"
              value={formData.chain || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Enter chain (e.g., Ethereum)..."
              error={!!errors.chain}
              helperText={errors.chain}
              sx={{
                ...styles.textField,
                '& .MuiInputBase-root': {
                  backgroundColor: '#F5F5F5',
                  borderRadius: '6px',
                  padding: '12px', // Increased padding
                  fontSize: '16px', // Increased font size
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E0E0E0', borderWidth: '2px' }, // Thicker border
                },
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Select Network</Typography>
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
              sx={{
                ...styles.textField,
                '& .MuiInputBase-root': {
                  backgroundColor: '#F5F5F5',
                  borderRadius: '6px',
                  padding: '12px', // Increased padding
                  fontSize: '16px', // Increased font size
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E0E0E0', borderWidth: '2px' }, // Thicker border
                },
              }}
            >
              <MenuItem value="">Choose...</MenuItem>
              {networkOptions.map((network) => (
                <MenuItem key={network} value={network}>
                  {network}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.fieldContainer}>
            <Typography sx={styles.fieldLabel}>Status</Typography>
            <TextField
              select
              name="status"
              value={formData.status}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                ...styles.textField,
                '& .MuiInputBase-root': {
                  backgroundColor: '#F5F5F5',
                  borderRadius: '6px',
                  padding: '12px', // Increased padding
                  fontSize: '16px', // Increased font size
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#E0E0E0', borderWidth: '2px' }, // Thicker border
                },
              }}
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