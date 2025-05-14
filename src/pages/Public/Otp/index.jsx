import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { styles } from './styles';
import { useVerifyLogin } from '../../../Hooks/authentication';
import OtpInputs from '../Otp/OtpInputs';
import VerifyButton from '../Otp/VerifyButton';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
  const { verifyLogin, loading } = useVerifyLogin();

  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const otp_type = localStorage.getItem('otp_type');

  useEffect(() => {
    if (!email || !password || !otp_type) {
      toast.error("Login session expired. Please log in again.");
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    verifyLogin({ email, password, otp_type, otp: otpValue });
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

        <OtpInputs
          otp={otp}
          inputsRef={inputsRef}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />

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
