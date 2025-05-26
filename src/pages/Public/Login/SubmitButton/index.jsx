import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styles } from '../styles';

const SubmitButton = ({ loading }) => (
  <Box
    sx={{
      ...styles.signupButton,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      cursor: loading ? 'not-allowed' : 'pointer',
    }}
    component="button"
    type="submit"
    disabled={loading}
  >
    {loading && (
      <CircularProgress
        size={24}
        sx={{ color: 'white', position: 'absolute' }}
      />
    )}
    <Typography sx={styles.signupText}>
      {loading ? '' : 'Sign In'}
    </Typography>
  </Box>
);

export default SubmitButton;