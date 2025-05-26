import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useVerifyLogin } from '../../../Hooks/authentication';
import { styles } from './styles';
import VerifyButton from '../Otp/VerifyButton';
import OtpInput from '../Otp/OtpInputs';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const { verifyLogin, loading } = useVerifyLogin();

  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const otp_type = localStorage.getItem('otp_type');

  useEffect(() => {
    if (!email || !password || !otp_type) {
      toast.error("Login session expired. Please log in again.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    verifyLogin({ email, password, otp_type, otp });
  };

  return (
    <Box sx={styles.container} component="form" onSubmit={handleSubmit}>
      <Box sx={styles.circleTopLeft} />
      <Box sx={styles.circleBottomRight} />

      <Box sx={styles.loginBox}>
        <img src="../image 5.png" alt="logo" style={styles.logo} />

        <Typography sx={styles.title}>Verify Your Account</Typography>
        <Typography sx={styles.subtitle}>
          Enter the 6-digit code sent to your email or phone.
        </Typography>

        <OtpInput value={otp} onChange={setOtp} />

        <VerifyButton loading={loading} styles={styles} />

        <Typography sx={{ mt: 2, fontSize: '14px', color: '#555' }}>
          Didn’t receive a code?{' '}
          <span style={{ color: '#1976d2', cursor: 'pointer' }}>Resend</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default OtpPage;