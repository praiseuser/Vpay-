import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';
import { loadingOverlayStyle } from '../countryStyles';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box sx={loadingOverlayStyle}>
      <CircularProgress size={30} sx={{ color: '#1976d2' }} />
    </Box>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;