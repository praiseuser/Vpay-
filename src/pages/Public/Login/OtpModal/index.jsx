import React from 'react';
import { Box, Typography, CircularProgress, Modal, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';

const OtpModal = ({ open, onClose, otpType, setOtpType, handleSendOtp, loading }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="otp-type-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '10px',
          p: 3,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          id="otp-type-modal"
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 600,
            color: '#252525',
            mb: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          How do you want to verify OTP?
        </Typography>

        <RadioGroup
          value={otpType}
          onChange={(e) => setOtpType(e.target.value)}
          sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <FormControlLabel
            value="email"
            control={<Radio />}
            label="Email"
            sx={{ '& .MuiTypography-root': { fontFamily: 'Inter', fontSize: '16px' } }}
          />
        </RadioGroup>

        <Button
          variant="contained"
          onClick={handleSendOtp}
          disabled={loading}
          sx={{
            backgroundColor: '#218DC9',
            color: 'white',
            fontFamily: 'Inter',
            fontSize: '14px',
            textTransform: 'none',
            borderRadius: '8px',
            px: 4,
            py: 1,
            width: '100%',
            '&:hover': {
              backgroundColor: '#1AA3D6',
            },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send'}
        </Button>
      </Box>
    </Modal>
  );
};

export default OtpModal;