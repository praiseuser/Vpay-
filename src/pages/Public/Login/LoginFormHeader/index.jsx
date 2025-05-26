import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles'

const LoginFormHeader = () => (
  <>
    <img src="../image 5.png" alt="logo" style={styles.logo} />
    <Typography sx={styles.title}>
      Enter your personal details
    </Typography>
    <Typography sx={styles.subtitle}>
      We’re almost there, just input these final details.
    </Typography>
  </>
);

export default LoginFormHeader;
