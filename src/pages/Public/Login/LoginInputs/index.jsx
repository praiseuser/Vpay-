import React from 'react';
import { Box } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { styles } from '../styles';

const LoginInputs = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) => (
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
  </Box>
);

export default LoginInputs;