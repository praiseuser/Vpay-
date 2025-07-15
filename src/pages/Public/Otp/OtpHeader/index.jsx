import { Box, Typography } from '@mui/material';

const OtpHeader = ({ styles }) => (
  <Typography sx={styles.title}>
    <Box sx={styles.logoContainer}>
      <Box
        sx={{
          position: 'absolute',
          top: '5px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          marginTop: '70px',
        }}
      >
        <img src="../image 5.png" alt="logo" style={styles.logo} />
      </Box>
    </Box>
    <Typography sx={styles.verifyTitle}>Verify your account</Typography>
    <Typography sx={styles.otpInstruction}>How do you want to receive OTP?</Typography>
  </Typography>
);

export default OtpHeader;
