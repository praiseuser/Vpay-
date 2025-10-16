import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import CustomLoader from '../../../../components/CustomLoader';
import { loadingOverlayStyle } from '../countryStyles';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box sx={loadingOverlayStyle}>
     <CustomLoader />
    </Box>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;