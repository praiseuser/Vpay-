import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  marginTop: '10px',
});

const FormFooter = ({ loading, handleCancel, handleAddFeeClick }) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
    <StyledButton variant="outlined" onClick={handleCancel} disabled={loading}>
      Cancel
    </StyledButton>
    <StyledButton
      variant="contained"
      onClick={handleAddFeeClick}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : null}
    >
      {loading ? 'Adding...' : 'Add Fee'}
    </StyledButton>
  </Box>
);

FormFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleAddFeeClick: PropTypes.func.isRequired,
};

export default FormFooter;