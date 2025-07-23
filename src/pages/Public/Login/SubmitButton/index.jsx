import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styles } from '../styles';

const SubmitButton = ({ loading }) => (
  <Box
    sx={{
      ...styles.signupButton,
      width: { xs: '90%', sm: 450 },
      marginTop: { xs: 2, sm: 4 },
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