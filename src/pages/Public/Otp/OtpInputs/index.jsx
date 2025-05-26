import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

const OtpInput = ({ value, onChange, length = 6 }) => {
  return (
    <MuiOtpInput
      value={value}
      onChange={onChange}
      length={length}
      sx={{
        display: 'flex',
        gap: '10px',
        mb: 2,
        '& .MuiInputBase-root': {
          fontFamily: 'Inter',
          fontSize: '24px',
          width: '50px',
          height: '50px',
          textAlign: 'center',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
          '&:hover': {
            borderColor: '#218DC9',
          },
        },
        '& .Mui-focused': {
          borderColor: '#218DC9',
          boxShadow: '0 0 0 2px rgba(33, 141, 201, 0.2)',
        },
      }}
    />
  );
};

export default OtpInput;