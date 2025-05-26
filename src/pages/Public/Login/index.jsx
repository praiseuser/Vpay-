import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAuthentication } from '../../../Hooks/authentication';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import LoginFormHeader from '../Login/LoginFormHeader';
import LoginInputs from '../Login/LoginInputs';
import SubmitButton from '../Login/SubmitButton';
import OtpModal from '../Login/OtpModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpType, setOtpType] = useState('email');
  const [modalOpen, setModalOpen] = useState(false);

  const { login, loading, error } = useAuthentication();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleSendOtp = () => {
    login({ email, password, otp_type: otpType });
    setModalOpen(false);
  };

  return (
    <Box sx={styles.container} component="form" onSubmit={handleSubmit}>
      <Box sx={styles.circleTopLeft} />
      <Box sx={styles.circleBottomRight} />

      <Box sx={styles.loginBox}>
        <LoginFormHeader />
        {error && (
          <Typography sx={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        <LoginInputs
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <SubmitButton loading={loading} />
        <OtpModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          otpType={otpType}
          setOtpType={setOtpType}
          handleSendOtp={handleSendOtp}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Login;