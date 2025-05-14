import React from 'react';
import { TextField, Box } from '@mui/material';

const OtpInputs = ({ otp, inputsRef, handleChange, handleKeyDown }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', mb: 2 }}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputRef={(el) => (inputsRef.current[index] = el)}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
              fontSize: '24px',
              padding: '12px',
              width: '50px',
              height: '25px',
            },
          }}
          variant="outlined"
          required
        />
      ))}
    </Box>
  );
};

export default OtpInputs;
