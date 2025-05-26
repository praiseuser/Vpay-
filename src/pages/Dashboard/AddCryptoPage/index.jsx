import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import styles from './AddCryptoPageStyles';
import CryptoFormHeader from '../AddCryptoPage/CryptoFormHeader';
import CryptoFormFields from '../AddCryptoPage/CryptoFormFields';
import CryptoFormActions from '../AddCryptoPage/CryptoFormActions';
import { useCreateCryptoCurrency } from '../../../Hooks/useCryptoCurrency';

const AddCryptoPage = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedCrypto: '',
    selectedNetwork: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});

  const { createCryptoCurrency, loading, error, success } = useCreateCryptoCurrency();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.selectedCrypto) newErrors.selectedCrypto = 'Cryptocurrency is required';
    if (!formData.selectedNetwork) newErrors.selectedNetwork = 'Network is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newCrypto = {
        crypto_name: formData.selectedCrypto,
        network: formData.selectedNetwork,
        status: formData.status === 'Active' ? '1' : '0',
      };
      console.log("Data being sent to create Crypto Currency:", newCrypto);
      createCryptoCurrency(newCrypto);
      if (success) {
        onSubmit(newCrypto);
        onCancel();
      }
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
              loading={loading}
              error={error}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCryptoPage;