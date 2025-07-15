import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const VerifyButton = ({ loading, styles, disabled }) => {
  return (
    <Box
      sx={{
        ...styles.signupButton,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : loading ? 0.7 : 1,
      }}
      component="button"
      type="submit"
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <Typography sx={styles.signupText}>Continue</Typography>
      )}
    </Box>
  );
};

export default VerifyButton;
