import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../../../components/CustomButton';
import { Box } from '@mui/material';


const FiatActions = ({ fiatItem, handleEditClick }) => (
  <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <CustomButton type="edit" onClick={() => handleEditClick(fiatItem)} />
  </Box>
);

FiatActions.propTypes = {
  fiatItem: PropTypes.shape({
    Fiat_Currency: PropTypes.string.isRequired,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default FiatActions;