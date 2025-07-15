import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../../../components/CustomButton';
import { Box } from '@mui/material';


const CryptoActions = ({ crypto, onEditClick }) => (
  <Box style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    <CustomButton type="edit" onClick={() => onEditClick(crypto)} />
    <CustomButton type="disable" />
  </Box>
);

CryptoActions.propTypes = {
  crypto: PropTypes.shape({
    crypto_name: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default CryptoActions;