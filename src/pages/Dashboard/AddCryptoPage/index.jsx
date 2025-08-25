import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import styles from './AddCryptoPageStyles';
import CryptoFormHeader from '../AddCryptoPage/CryptoFormHeader';
import CryptoFormFields from '../AddCryptoPage/CryptoFormFields';
import CryptoFormActions from '../AddCryptoPage/CryptoFormActions';
import { useCreateCryptoCurrency } from '../../../Hooks/useCryptoCurrency';
import PasswordModal from '../Card/PasswordModal';

const AddCryptoPage = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedCrypto: '',
    selectedNetwork: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});
  const [accountPassword, setAccountPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { 
    createCryptoCurrency, 
    loading, 
    error, 
    success,
    showPasswordModal,
    passwordVerified,
    resetState 
  } = useCreateCryptoCurrency();

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

  const handlePasswordSubmit = async () => {
    if (!accountPassword.trim()) {
      return;
    }
    
    setPasswordLoading(true);
    const success = await createCryptoCurrency(formData, accountPassword); // Pass formData and password
    setPasswordLoading(false);
    
    if (success) {
      setAccountPassword('');
      if (success) {
        onSubmit(formData);
        onCancel();
      }
    }
  };

  const handlePasswordModalClose = () => {
    resetState(); // Reset state on close
  };

  const handleSubmit = () => {
    if (validateForm() && passwordVerified) {
      createCryptoCurrency(formData, accountPassword); // Trigger creation if already verified
      if (success) {
        onSubmit(formData);
        onCancel();
      }
    } else if (!passwordVerified) {
      setShowPasswordModal(true); // Show modal if not verified
    }
  };

  return (
    <Box sx={styles.container}>
      <PasswordModal 
        open={showPasswordModal} 
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={accountPassword}
        setPassword={setAccountPassword}
        loading={passwordLoading || loading}
        error={error}
      />
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