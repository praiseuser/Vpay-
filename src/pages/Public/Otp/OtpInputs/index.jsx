import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

const OtpInput = ({ value, onChange, length = 6 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',  
        marginBottom: '16px',
      }}
    >
      <MuiOtpInput
        value={value}
        onChange={onChange}
        length={length}
        sx={{
          display: 'flex',
          gap: '8px',
          '& .MuiInputBase-root': {
            fontFamily: 'Inter',
            fontSize: '18px',
            width: '45px',
            height: '45px',
            textAlign: 'center',
            borderRadius: '6px',
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
    </div>
  );
};

export default OtpInput;
