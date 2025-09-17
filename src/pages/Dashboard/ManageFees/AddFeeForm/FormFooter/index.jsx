import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, CircularProgress } from '@mui/material';

const FormFooter = ({ loading, handleCancel, handleAddFeeClick, formData }) => {
  const isFormValid = formData.fee_name && formData.fee_name !== '' && formData.fee_amount && (!formData.has_max_limit || formData.max_limit);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', mt: 3, mr: '80px' }}>
      <Button
        variant="outlined"
        onClick={handleCancel}
        disabled={loading}
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '14px',
          textTransform: 'capitalize',
          borderRadius: '12px',
          color: '#73757C',
          borderColor: '#D9D9D9',
          padding: '10px 25px',
          '&:hover': {
            borderColor: '#4A85F6',
            color: '#4A85F6',
          },
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleAddFeeClick}
        disabled={loading || !isFormValid}
        sx={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '14px',
          textTransform: 'capitalize',
          borderRadius: '12px',
          backgroundColor: '#02042D',
          padding: '10px 35px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          '&:disabled': {
            backgroundColor: '#b0bec5',
          },
          '&:hover': {
            backgroundColor: '#2E3752',
          },
        }}
      >
        {loading ? (
          <CircularProgress
            size={20}
            sx={{
              color: '#fff',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        ) : (
          'Add Fee'
        )}
      </Button>
    </Box>
  );
};

FormFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleAddFeeClick: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    fee_name: PropTypes.string,
    fee_amount: PropTypes.number,
    has_max_limit: PropTypes.bool,
    max_limit: PropTypes.number,
  }).isRequired,
};

export default FormFooter;