import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const CustomLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '56%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 70,
          height: 70,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '4px solid',
            borderColor: '#1e88e5 transparent #1e88e5 transparent',
            borderRadius: '50%',
            animation: `${spin} 1.2s linear infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '70%',
            height: '70%',
            top: '15%',
            left: '15%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        >
          <img
            src="/image 5.png"
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 4px rgba(33, 141, 201, 0.5))',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 1,
          fontSize: '0.4rem',
          color: '#1e88e5',
          letterSpacing: '0.3px',
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        Loading...
      </Box>
    </Box>
  );
};

export default CustomLoader;
