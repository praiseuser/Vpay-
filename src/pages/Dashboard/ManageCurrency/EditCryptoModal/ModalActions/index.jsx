import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Box } from '@mui/material';


const ModalActions = ({ onCancel, onSave, loading }) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
    <Button
      onClick={onCancel}
      sx={{
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '14px',
        textTransform: 'capitalize',
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={onSave}
      variant="contained"
      disabled={loading}
      sx={{
        width: '140px',
        height: '48px',
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '14px',
        textTransform: 'capitalize',
        borderRadius: '12px',
        backgroundColor: '#208BC9',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: '#1B7BB5',
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
    </Button>
  </Box>
);

ModalActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ModalActions;