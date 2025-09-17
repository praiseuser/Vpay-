import React, { useState } from 'react';
import { Box } from '@mui/material';
import styles from './AddCryptoPageStyles';
import CryptoFormHeader from '../AddCryptoPage/CryptoFormHeader';
import CryptoFormFields from '../AddCryptoPage/CryptoFormFields';
import CryptoFormActions from '../AddCryptoPage/CryptoFormActions';
import { useCreateCryptoCurrency } from '../../../Hooks/useCryptoCurrency';

const AddCryptoPage = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    selectedCrypto: '',
    cryptoSymbol: '',
    cryptoImage: null,
    chain: '',
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
    setShowPasswordModal, 
    passwordVerified,
    resetState 
  } = useCreateCryptoCurrency();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value; // Handle file input for cryptoImage
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.selectedCrypto) newErrors.selectedCrypto = 'Cryptocurrency is required';
    if (!formData.cryptoSymbol) newErrors.cryptoSymbol = 'Crypto Symbol is required';
    if (!formData.chain) newErrors.chain = 'Chain is required';
    if (!formData.selectedNetwork) newErrors.selectedNetwork = 'Network is required';
    if (!formData.status) newErrors.status = 'Status is required';
    // cryptoImage is optional for now, but can be made required if needed
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
      onSubmit(formData);
      onCancel();
    }
  };

  const handlePasswordModalClose = () => {
    resetState(); // Reset state on close
    onCancel(); // Close the form if password is canceled
  };

  const handleSubmit = () => {
    if (validateForm() && passwordVerified) {
      createCryptoCurrency(formData, accountPassword); // Proceed with creation if verified
      if (success) {
        onSubmit(formData);
        onCancel();
      }
    } else if (validateForm() && !passwordVerified) {
      setShowPasswordModal(true); // Show modal only after valid form submission
    }
  };

  return (
    <Box sx={styles.container}>
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
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
            handlePasswordSubmit={handlePasswordSubmit}
            handlePasswordModalClose={handlePasswordModalClose}
            accountPassword={accountPassword}
            setAccountPassword={setAccountPassword}
            passwordLoading={passwordLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddCryptoPage;