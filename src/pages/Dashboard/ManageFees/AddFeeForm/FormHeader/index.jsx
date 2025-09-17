import React from 'react';
import { Typography } from '@mui/material';

const FormHeader = () => (
  <Typography
    variant="h5" 
    align="left"
    sx={{
      fontFamily: 'Inter', 
      fontWeight: 700, 
      fontSize: '20px', 
      color: '#02042D', 
      mt: 3, 
      mb: 2, 
    }}
  >
    Add New Fee
  </Typography>
);

export default FormHeader;