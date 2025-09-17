import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressStep = styled(Box)`
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

const ProgressBar = styled(LinearProgress)`
  height: 10px;
  border-radius: 5px;
  background-color: #e0e0e0;
  width: 30px;
  & .MuiLinearProgress-bar {
    background-color: #02042D;
    transition: width 0.3s ease;
  }
`;

const ProgressContainer = styled(Box)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ProgressIndicator = ({ steps }) => {
  return (
    <ProgressContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {steps.map((step, index) => (
          <ProgressStep key={index} active={step}>{index + 1}</ProgressStep>
        ))}
      </Box>
      <ProgressBar variant="determinate" value={steps.filter(Boolean).length / 3 * 100} />
    </ProgressContainer>
  );
};

export default ProgressIndicator;