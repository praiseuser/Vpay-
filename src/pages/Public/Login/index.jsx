import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuthentication } from '../../../Hooks/authentication';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginFormHeader from '../Login/LoginFormHeader';
import LoginInputs from '../Login/LoginInputs';
import SubmitButton from '../Login/SubmitButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpMedium, setOtpMedium] = useState('email');

  const { login, loading, error } = useAuthentication();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('otp_medium', otpMedium);

    const loginBox = document.querySelector('.login-box');
    loginBox.classList.add('flip-out');
    setTimeout(() => navigate('/otp'), 600);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#02042D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          padding: { xs: 2, sm: 3, md: 6 },
          width: { xs: '90%', sm: '85%', md: 500 },
          maxWidth: 500,
          minHeight: { xs: 400, sm: 500, md: 550 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          border: '2px solid #0A0F3F',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            backgroundColor: '#0A0F3F',
            borderRadius: '8px 8px 0 0',
          },
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="login-box"
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: { xs: '10px 15px', sm: '20px 30px' },
            boxSizing: 'border-box',
          }}
        >
          <LoginFormHeader />
          {error && (
            <Typography
              sx={{
                fontSize: { xs: '14px', sm: '18px' },
                fontWeight: '700',
                color: 'red',
                marginBottom: { xs: '5px', sm: '10px' },
                fontFamily: 'Inter',
              }}
            >
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <LoginInputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <SubmitButton loading={loading} />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;