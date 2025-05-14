import { Box, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import { useAuthentication } from '../../../Hooks/authentication';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp_type, setOtp_type] = useState('email');
  const { login, loading, error } = useAuthentication();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered with userData:", { email, password, otp_type });
    const userData = { email, password, otp_type };
    login(userData);
  };

  console.log("Current loading state:", loading);
  console.log("Current error state:", error);
  console.log("Redux user state:", user);

  return (
    <Box sx={styles.container} component="form" onSubmit={handleSubmit}>
      <Box sx={styles.circleTopLeft} />
      <Box sx={styles.circleBottomRight} />

      <Box sx={styles.loginBox}>
        <img src="../image 5.png" alt="logo" style={styles.logo} />

        <Typography sx={styles.title}>
          Enter your personal details
        </Typography>
        <Typography sx={styles.subtitle}>
          We’re almost there, just input these final details.
        </Typography>

        {error && (
          <Typography sx={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </Typography>
        )}

        <Box sx={styles.inputContainer}>
          <Box sx={styles.inputField}>
            <Email sx={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </Box>
          <Box sx={styles.inputField}>
            <Lock sx={styles.inputIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <Box
              sx={styles.visibilityToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOff sx={styles.visibilityIcon} />
              ) : (
                <Visibility sx={styles.visibilityIcon} />
              )}
            </Box>
          </Box>
          <Box sx={styles.inputField}>
            <select
              value={otp_type}
              onChange={(e) => setOtp_type(e.target.value)} 
              style={styles.input}
              required
            >
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </Box>
        </Box>
        <Box
          sx={{
            ...styles.signupButton,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          component="button"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: 'white', position: 'absolute' }}
            />
          ) : null}
          <Typography sx={styles.signupText}>
            {loading ? '' : 'Sign In'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;