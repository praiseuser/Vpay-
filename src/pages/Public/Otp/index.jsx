import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuthentication, useVerifyLogin } from '../../../Hooks/authentication';
import VerifyButton from '../Otp/VerifyButton';
import OtpInput from '../Otp/OtpInputs';
import OtpOptions from '../Otp/OtpOptions';
import BackButton from '../Otp/BackButton';
import OtpHeader from '../Otp/OtpHeader';
import ResendOtp from '../Otp/ResendOtp';
import { styles } from './styles';
import CustomLoader from '../../../components/CustomLoader';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [otpMedium, setOtpMedium] = useState(localStorage.getItem('otp_medium') || 'email');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentOption, setOtpSentOption] = useState(null);

  const { login, loading: loginLoading } = useAuthentication();
  const { verifyLogin, loading: verifyLoading } = useVerifyLogin();
  const options = ['email', 'sms'];

  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  useEffect(() => {
    if (!email || !password || !otpMedium) {
      toast.error("Login session expired. Please log in again.");
    }
  }, [email, password, otpMedium]);

  const handleOtpMediumChange = (newMedium) => {
    setOtpMedium(newMedium);
    login({ email, password, otp_medium: newMedium })
      .then(() => {
        setOtpSent(true);
        setOtpSentOption(newMedium);
        setOtp('');
      })
      .catch(() => {
        setOtpSent(false);
        setOtpSentOption(null);
      });
  };

  const handleSelect = (option) => {
    if (!otpSent) {
      handleOtpMediumChange(option);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }
    verifyLogin({ email, password, otp_medium: otpMedium, otp });
  };

  return (
    <>
      {loginLoading && (
        <div style={styles.fullscreenOverlay}>
          <CustomLoader />
        </div>
      )}
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          backgroundColor: '#02042D',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            padding: { xs: 4, sm: 6 },
            width: { xs: '90%', sm: 450, md: 500 },
            maxWidth: 500,
            minHeight: 550,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
          <BackButton sx={{ ...styles.backButton, alignSelf: 'flex-start' }} />
          <form
            onSubmit={handleSubmit}
            style={{
              ...styles.form,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box',
            }}
          >
            <OtpHeader styles={styles} />
            <OtpOptions
              options={options}
              selectedOption={otpMedium}
              otpSentOption={otpSentOption}
              onSelect={handleSelect}
              sx={{
                container: { ...styles.buttonBox, width: '100%', justifyContent: 'center' },
                button: { ...styles.optionButton, fontSize: '1rem' },
                active: styles.optionButtonActive,
              }}
            />
            {otpSent && !loginLoading && (
              <>
                <OtpInput value={otp} onChange={setOtp} />
                <VerifyButton
                  loading={verifyLoading}
                  styles={{
                    ...styles,
                    signupButton: { ...styles.signupButton, width: '100%', maxWidth: '300px' },
                    signupText: styles.signupText,
                  }}
                  disabled={otp.length !== 6}
                />
                <ResendOtp
                  styles={styles}
                  otpMedium={otpMedium}
                  onResend={() => login({ email, password, otp_medium: otpMedium })}
                />
              </>
            )}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default OtpPage;