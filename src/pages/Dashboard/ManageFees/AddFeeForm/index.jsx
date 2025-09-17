import React, { useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import useAddFeeLogic from '../AddFeeForm/useAddFeeLogic';
import FormHeader from '../AddFeeForm/FormHeader';
import FormBody from '../AddFeeForm/FormBody';
import FormFooter from '../AddFeeForm/FormFooter';
import StatusMessage from '../AddFeeForm/StatusMessage';
import PasswordModal from '../../Card/PasswordModal';
import { FormContainer } from './style';

const AddFeeForm = ({ formData: initialFormData, setFormData, handleCreateFee, handleCancel }) => {
  const formRef = useRef(null);
  const {
    handleChange,
    handleSubmit,
    loading: formLoading,
    error: formError,
    success: formSuccess,
    createFiatCurrency,
    showPasswordModal,
    setShowPasswordModal,
    accountPassword,
    setAccountPassword,
    passwordVerified,
    resetState,
  } = useAddFeeLogic({ initialFormData, setFormData, handleCreateFee });

  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleAddFeeClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handlePasswordSubmit = async (password) => {
    setPasswordLoading(true);
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordLoading(false);
      return;
    }
    const latestFormData = { ...initialFormData };
    const success = await createFiatCurrency(latestFormData, trimmedPassword);

    if (success) {
      setShowPasswordModal(false);
      setAccountPassword('');
      handleCreateFee(latestFormData);
    } else {
      console.log('Password submission failed:', formError);
    }
    setPasswordLoading(false);
  };

  const handlePasswordModalClose = () => {
    resetState();
    handleCancel();
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit} ref={formRef}>
      <PasswordModal
        open={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        password={accountPassword}
        setPassword={setAccountPassword}
        loading={passwordLoading || formLoading}
        error={null}
      />
      <FormHeader />
      <Divider sx={{ width: '100%', borderColor: '#E0E0E0', mb: 2 }} />
      <StatusMessage loading={formLoading} error={formError} success={formSuccess} />
      <FormBody
        formData={initialFormData}
        handleChange={handleChange}
        loading={formLoading}
      />
      <FormFooter
        loading={formLoading}
        handleCancel={handleCancel}
        handleAddFeeClick={handleAddFeeClick}
        formData={initialFormData}
      />
    </FormContainer>
  );
};

AddFeeForm.propTypes = {
  formData: PropTypes.shape({
    fee_name: PropTypes.string,
    fee_type: PropTypes.string,
    fee_amount: PropTypes.number,
    status: PropTypes.bool,
    has_max_limit: PropTypes.bool,
    max_limit: PropTypes.number,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  handleCreateFee: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default AddFeeForm;