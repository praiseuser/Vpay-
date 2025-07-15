import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const StatusMessage = ({ loading, error, success }) => {
  if (loading) {
    return (
      <Typography align="center">
        <CircularProgress size={20} />
      </Typography>
    );
  }
  return null;
};

StatusMessage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.bool,
};

export default StatusMessage;