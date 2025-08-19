import { Box, styled } from '@mui/material';

const BouncingLoaderContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
}));

const Circle = styled('div')(({ theme }) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: '0 10px',
  backgroundColor: '#008080',
  animation: 'bounce 1s infinite ease-in-out, colorChange 2s infinite',
}));

const BouncingLoader = () => {
  return (
    <BouncingLoaderContainer>
      <Circle style={{ animationDelay: '0s' }} />
      <Circle style={{ animationDelay: '0.5s' }} />
    </BouncingLoaderContainer>
  );
};

export default BouncingLoader;

<style>
  {`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes colorChange {
      0% { backgroundColor: #008080; }
      50% { backgroundColor: #00CED1; }
      100% { backgroundColor: #008080; }
    }
  `}
</style>