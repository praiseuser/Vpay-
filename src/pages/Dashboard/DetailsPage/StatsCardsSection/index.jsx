import React from 'react';
import { Box, Button } from '@mui/material';
import {
  container,
  cardsWrapper,
  purpleCard,
  blueCard,
  greenCard,
  orangeCard,
  titleStyle,
  titleText,
  amountText,
  purpleButton,
  blueButton,
  greenButton,
  orangeButton,
} from './styles';

const StatsCardsSection = ({
  userId,
  onViewAllReceived,
  onViewAllWithdrawn,
  onViewAllFiatReceived,
  onViewAllFiatWithdrawn,
}) => {
  return (
    <Box sx={container}>
      <Box sx={titleStyle}>User Overview</Box>

      <Box sx={cardsWrapper}>
        <Box sx={blueCard}>
          <Box sx={titleText}>Total Crypto Balance</Box>
          <Box sx={amountText}>$92,300.00</Box>
          <Button sx={blueButton} onClick={() => onViewAllReceived(userId)}>
            View All
          </Button>
        </Box>

        <Box sx={purpleCard}>
          <Box sx={titleText}>Total Crypto Withdrawal</Box>
          <Box sx={amountText}>$45,200.00</Box>
          <Button sx={purpleButton} onClick={() => onViewAllWithdrawn(userId)}>
            View All
          </Button>
        </Box>

        {/* <Box sx={greenCard}>
          <Box sx={titleText}>Total Fiat Balance</Box>
          <Box sx={amountText}>₦3,500,000</Box>
          <Button sx={greenButton} onClick={() => onViewAllFiatReceived(userId)}>
            View All
          </Button>
        </Box>

        <Box sx={orangeCard}>
          <Box sx={titleText}>Total Fiat Withdrawal</Box>
          <Box sx={amountText}>₦1,750,000</Box>
          <Button sx={orangeButton} onClick={() => onViewAllFiatWithdrawn(userId)}>
            View All
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default StatsCardsSection;
