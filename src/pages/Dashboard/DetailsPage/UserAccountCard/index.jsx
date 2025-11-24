import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {
  container,
  titleText,
  cardsWrapper,
  accountCard,
  walletIconBox,
  balanceText,
  subText,
  btcWrapper,
  btcCard,
  btcHeader,
  btcImage,
  btcText,
  btcPercent,
  btcAmount,
  btcUsd,
  purpleButton,
} from './styles';

const UserAccountCard = () => {
  return (
    <Box sx={container}>
      <Typography sx={titleText}>USER ACCOUNT</Typography>

      <Box sx={cardsWrapper}>
        <Box sx={accountCard}>
          <Box sx={walletIconBox}>
            <AccountBalanceWalletOutlinedIcon sx={{ color: '#1E88E5', fontSize: 28 }} />
          </Box>

          <Typography sx={balanceText}>$24,890.50</Typography>
          <Typography sx={subText}>Available Balance</Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default UserAccountCard;
