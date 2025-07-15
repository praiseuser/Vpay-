import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles';

const LoginFormHeader = () => (
  <Box
    sx={{
      ...styles.headerContainer,
      position: 'relative',
      height: 150,
      paddingTop: 0, 
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '-20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <img src="../image 5.png" alt="logo" style={styles.logo} />
    </Box>

    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={styles.subtitle}>Welcome Back</Typography>
    </Box>

    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={styles.title}>Enter your personal details</Typography>
    </Box>
  </Box>
);

export default LoginFormHeader;
