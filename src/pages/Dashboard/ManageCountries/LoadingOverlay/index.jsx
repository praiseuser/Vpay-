import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import BouncingLoader from '../../../../components/BouncingLoader';
import { loadingOverlayStyle } from '../countryStyles';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box sx={loadingOverlayStyle}>
      <BouncingLoader />
    </Box>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;