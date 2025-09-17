import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { Box, LinearProgress } from '@mui/material';

// Animation keyframes
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
export const FormContainer = styled(Box)`
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* More prominent shadow */
  position: relative;
  overflow: hidden;
  &:before {
    content: none; /* Removed pulse animation */
  }
`;

export const ProgressStep = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#02042D' : '#e0e0e0'};
  color: ${props => props.active ? '#fff' : '#757575'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter';
  font-weight: 700;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover { transform: scale(1.1); }
`;

export const ProgressBar = styled(LinearProgress)`
  height: 10px;
  border-radius: 5px;
  background-color: #e0e0e0;
  width: 30px;
  & .MuiLinearProgress-bar {
    background-color: #02042D;
    transition: width 0.3s ease;
  }
`;

export const ProgressContainer = styled(Box)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StaggeredInput = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CustomInput = styled(Box)`
  flex: 1;
  max-width: 350px;
  animation: ${fadeIn} 0.5s ease-out;
`;