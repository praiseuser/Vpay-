import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, CircularProgress } from '@mui/material';

const ActionButtons = ({ loading, onClose, onSubmit }) => (
  <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
    <Button
      variant="outlined"
      onClick={onClose}
      disabled={loading}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      type="submit"
      onClick={onSubmit}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'Save'}
    </Button>
  </Box>
);

ActionButtons.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ActionButtons;