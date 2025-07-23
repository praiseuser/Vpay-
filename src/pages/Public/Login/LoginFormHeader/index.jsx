import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles';

const LoginFormHeader = () => (
  <Box
    sx={{
      ...styles.headerContainer,
      height: { xs: 100, sm: 150 },
      paddingTop: 0,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: { xs: '-10px', sm: '-20px' },
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        marginTop: { xs: '40px', sm: '50px' },
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