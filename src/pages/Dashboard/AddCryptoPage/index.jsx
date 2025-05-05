import React, { useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from './AddCryptoPageStyles';
import CryptoFormHeader from '../AddCryptoPage/CryptoFormHeader';
import CryptoFormFields from '../AddCryptoPage/CryptoFormFields';
import CryptoFormActions from '../AddCryptoPage/CryptoFormActions';

const AddCryptoPage = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedCrypto: '',
    selectedNetwork: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.selectedCrypto) newErrors.selectedCrypto = 'Cryptocurrency is required';
    if (!formData.selectedNetwork) newErrors.selectedNetwork = 'Network is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newCrypto = {
        currency: formData.selectedCrypto,
        network: formData.selectedNetwork,
        status: formData.status,
        date_activated: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).replace(',', ' |'),
      };
      onSubmit(newCrypto);
      onCancel();
    }
  };

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper}>
        <CryptoFormHeader />
        <Box sx={styles.formContainer}>
          <Box sx={styles.inputFields}>
            <CryptoFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
            <CryptoFormActions
              onCancel={onCancel}
              onSubmit={handleSubmit}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCryptoPage;