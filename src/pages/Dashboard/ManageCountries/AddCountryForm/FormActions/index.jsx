import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { actionsContainerStyle, submitButtonStyle } from '../countryFormStyles';

const FormActions = ({ onCancel, loading }) => (
  <Box sx={actionsContainerStyle}>
    <Typography
      onClick={onCancel}
      sx={{
        fontSize: '14px',
        color: '#2E3B55',
        fontFamily: 'Mada, sans-serif',
        fontWeight: 600,
        cursor: 'pointer',
        alignSelf: 'center',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      Cancel
    </Typography>
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
      startIcon={loading ? <CircularProgress color="inherit" size={18} /> : null}
      sx={submitButtonStyle}
    >
      {loading ? 'Adding...' : 'Submit'}
    </Button>
  </Box>
);

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FormActions;
