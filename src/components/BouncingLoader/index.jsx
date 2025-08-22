import { Box, styled } from '@mui/material';
import './BouncingLoader.css';

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

   const BouncingLoader = () => {
     return (
       <BouncingLoaderContainer>
         <div className="bouncing-circle" style={{ animationDelay: '0s' }} />
         <div className="bouncing-circle" style={{ animationDelay: '0.5s' }} />
       </BouncingLoaderContainer>
     );
   };

   export default BouncingLoader;