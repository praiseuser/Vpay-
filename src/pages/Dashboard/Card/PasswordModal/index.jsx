import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, CircularProgress } from '@mui/material';

const PasswordModal = ({ open, onClose, onSubmit, password, setPassword, loading, error }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setPassword(newOtp.join(''));

    if (value && index < 3) inputsRef.current[index + 1].focus();
    if (!value && index > 0) inputsRef.current[index - 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    if (otp.join('').length === 4) {
      await onSubmit(otp.join(''));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          textAlign: 'center',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Enter Activity Pin</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Please enter your 4-digit pin
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={loading}
              style={{
                width: '40px',       
                height: '40px',     
                fontSize: '1.25rem',
                textAlign: 'center',
                borderRadius: '6px',
                border: '1px solid #ccc',
                outline: 'none',
              }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={otp.join('').length < 4 || loading}
          sx={{ minWidth: 90 }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;
