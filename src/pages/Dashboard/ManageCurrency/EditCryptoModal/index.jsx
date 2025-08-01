import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useEditFiatStatus } from '../../../../Hooks/useCryptoCurrency';
import CryptoFormInputs from '../../ManageCurrency/EditCryptoModal/CryptoFormInputs';
import ModalActions from '../../ManageCurrency/EditCryptoModal/ModalActions';
import PropTypes from 'prop-types';

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

        <CryptoFormInputs
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          networkOptions={networkOptions}
          statusOptions={statusOptions}
        />

        <ModalActions
          onCancel={onClose}
          onSave={handleSubmit}
          loading={loading}
        />
      </Box>
    </Modal>
  );
};

EditCryptoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  crypto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    crypto_name: PropTypes.string,
    network: PropTypes.string,
    status: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default EditCryptoModal;