import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { statusLabelStyle } from '../fiatModalStyles';


const StatusDisplay = ({ status }) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={statusLabelStyle}>Status</Typography>
    <Typography>{status === 1 ? 'Enabled' : 'Disabled'}</Typography>
  </Box>
);

StatusDisplay.propTypes = {
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

StatusDisplay.defaultProps = {
  status: 0,
};

export default StatusDisplay;