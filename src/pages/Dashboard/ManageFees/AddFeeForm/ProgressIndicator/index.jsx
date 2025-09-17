import React from 'react';
import { Box } from '@mui/material';
import { ProgressContainer, ProgressStep, ProgressBar } from '../style';

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