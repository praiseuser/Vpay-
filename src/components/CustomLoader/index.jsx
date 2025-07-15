import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const bounceDots = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const CustomLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        {[0, 1, 2, 3].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              margin: '0 6px',
              borderRadius: '50%',
              backgroundColor: '#02042D',
              animation: `${bounceDots} 1.4s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomLoader;
