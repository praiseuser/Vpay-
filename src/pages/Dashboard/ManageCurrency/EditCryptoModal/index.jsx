import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { useEditFiatStatus } from '../../../../Hooks/useCryptoCurrency';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'white',
  border: '2px solid #DCE7EC',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const EditCryptoModal = ({ open, onClose, crypto, onSave }) => {
  const [formData, setFormData] = useState({
    crypto_name: '',
    network: '',
    status: 'Inactive',
  });

  const [errors, setErrors] = useState({});
  const { editCurrency, loading } = useEditFiatStatus();

  useEffect(() => {
    if (crypto) {
      setFormData({
        crypto_name: crypto.crypto_name || '',
        network: crypto.network || '',
        status: crypto.status === '1' ? 'Active' : 'Inactive',
      });
    }
  }, [crypto]);

  const networkOptions = ['mainnet', 'testnet'];
  const statusOptions = ['Active', 'Inactive'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.crypto_name) newErrors.crypto_name = 'Cryptocurrency is required';
    if (!formData.network) newErrors.network = 'Network is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const updatedCrypto = {
        crypto_name: formData.crypto_name,
        network: formData.network,
        status: formData.status === 'Active' ? '1' : '0',
      };

      const result = await editCurrency(crypto.id, updatedCrypto);
      if (result) {
        onSave(result);
        onClose();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-crypto-modal"
      aria-describedby="edit-crypto-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '24px',
            color: '#4A85F6',
          }}
        >
          Edit Cryptocurrency
        </Typography>

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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button
            onClick={onClose}
            sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', textTransform: 'capitalize' }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              width: '140px',
              height: '48px',
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'capitalize',
              borderRadius: '12px',
              backgroundColor: '#208BC9',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#1B7BB5',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCryptoModal;
