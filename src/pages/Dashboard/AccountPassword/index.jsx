import React from 'react';
import { Button, TextField, Box, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import usePasswordManagement from '../../../Hooks/useAccountPassword';

const AccountPassword = ({ adminId }) => {
  const {
    password,
    setPassword,
    otpMedium,
    setOtpMedium,
    otp,
    setOtp,
    loading,
    error,
    success,
    otpSent,
    requestOtp,
    createPassword,
    resetForm,
  } = usePasswordManagement(adminId);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleRequestOtp = () => {
    if (!password.trim()) {
      alert('Please enter a password first');
      return;
    }
    requestOtp();
  };

  const handleCreatePassword = () => {
    if (!password.trim()) {
      alert('Please enter a password');
      return;
    }
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }
    createPassword();
  };

  const handleReset = () => {
    resetForm();
    setShowPassword(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create Account Password {adminId}
      </Typography>
      
      <TextField
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={loading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        select
        label="OTP Medium"
        value={otpMedium}
        onChange={(e) => setOtpMedium(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        SelectProps={{ native: true }}
        disabled={loading || otpSent}
      >
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </TextField>
      
      <TextField
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        disabled={loading || !otpSent}
        placeholder={otpSent ? "Enter the OTP sent to your " + otpMedium : "Request OTP first"}
      />
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={handleRequestOtp} 
          disabled={loading || !password.trim() || otpSent}
          sx={{ mb: 2 }}
        >
          {loading ? 'Sending...' : 'Request OTP'}
        </Button>
        
        <Button 
          variant="contained" 
          color="success"
          onClick={handleCreatePassword} 
          disabled={loading || !otpSent || !password.trim() || !otp.trim()}
          sx={{ mb: 2 }}
        >
          {loading ? 'Creating...' : 'Create Password'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleReset} 
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AccountPassword;