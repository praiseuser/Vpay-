import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

const ResendOtp = ({ styles, otpMedium, onResend }) => {
  const [counter, setCounter] = useState(50);

  useEffect(() => {
    if (counter <= 0) return;

    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  const handleResendClick = () => {
    onResend();
    setCounter(50);
  };

  return (
    <div style={{ marginTop: '12px' }}>
      {counter > 0 ? (
        <Typography sx={styles.resendText}>
          Resend OTP in {counter}s
        </Typography>
      ) : (
        <Button variant="text" onClick={handleResendClick} sx={styles.resendButton}>
          Resend OTP
        </Button>
      )}
    </div>
  );
};

export default ResendOtp;
