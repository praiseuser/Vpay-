import React from 'react';
import { Box, Button } from '@mui/material';
import {
  cardContainer,
  cardTitle,
  buttonContainer,
  emailButton,
  flagButton,
  emailText,
  flagText
} from './styles';

const FlagCardsCard = () => {
  return (
    <Box sx={cardContainer}>

      <Box sx={buttonContainer}>
        <Button sx={emailButton}>
          <Box sx={emailText}>Send E-mail</Box>
        </Button>

        <Button sx={flagButton}>
          <Box sx={flagText}>Flag User</Box>
        </Button>
      </Box>
    </Box>
  );
};

export default FlagCardsCard;
