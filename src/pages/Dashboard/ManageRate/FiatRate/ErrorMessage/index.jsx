import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <Typography align="center" color="error" sx={{ mt: 2 }}>
      {error}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;