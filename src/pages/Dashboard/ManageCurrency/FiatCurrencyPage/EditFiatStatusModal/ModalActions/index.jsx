import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { buttonContainerStyle, cancelButtonStyle, saveButtonStyle } from '../fiatModalStyles';


const ModalActions = ({ onCancel, onSave }) => (
  <Box sx={buttonContainerStyle}>
    <Typography sx={cancelButtonStyle} onClick={onCancel}>
      Cancel
    </Typography>
    <Typography sx={saveButtonStyle} onClick={onSave}>
      Save
    </Typography>
  </Box>
);

ModalActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ModalActions;