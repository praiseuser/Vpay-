import React, { useRef } from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import useAddFeeLogic from '../AddFeeForm/useAddFeeLogic';
import FormHeader from '../AddFeeForm/FormHeader';
import FormBody from '../AddFeeForm/FormBody';
import FormFooter from '../AddFeeForm/FormFooter';
import StatusMessage from '../AddFeeForm/StatusMessage';

const AddFeeForm = ({ formData: initialFormData, setFormData, handleCreateFee, handleCancel }) => {
  const formRef = useRef(null);
  const {
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
  } = useAddFeeLogic({ initialFormData, setFormData, handleCreateFee });

  const handleAddFeeClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      ref={formRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        width: '100%',
        height: 'auto',
        margin: '0 auto',
        backgroundColor: '#fff',
        border: '2px solid #E0E0E0',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <FormHeader />
      <Divider sx={{ width: '100%', borderColor: '#E0E0E0', mb: 2 }} />
      <StatusMessage loading={loading} error={error} success={success} />
      <FormBody
        formData={initialFormData}
        handleChange={handleChange}
        loading={loading}
      />
      <FormFooter
        loading={loading}
        handleCancel={handleCancel}
        handleAddFeeClick={handleAddFeeClick}
      />
    </Box>
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