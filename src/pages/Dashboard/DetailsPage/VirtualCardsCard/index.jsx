import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { cardContainer, cardTitle, gridContainer, labelText, valueText, virtualCardBox } from './styles';

const VirtualCardsCard = ({ virtualCards, loading }) => {
  return (
    <Box sx={cardContainer}>
      <Box sx={cardTitle}>VIRTUAL CARDS</Box>

      <Box sx={gridContainer}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} sx={virtualCardBox}>
                <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
              </Box>
            ))
          : virtualCards?.length > 0
          ? virtualCards.map((card, index) => (
              <Box key={index} sx={virtualCardBox}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={labelText}>{card.type}</Box>
                  <Box sx={{ ...labelText, color: card.status === 'Active' ? '#16A34A' : '#F59E0B' }}>
                    {card.status}
                  </Box>
                </Box>

                <Box sx={{ ...valueText, fontSize: '16px', mb: 1 }}>{card.cardNumber}</Box>
                <Box sx={{ ...valueText, fontSize: '13px', color: '#E5E7EB' }}>{card.cardholder}</Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Box sx={labelText}>EXP: {card.expiry}</Box>
                </Box>
              </Box>
            ))
          : (
              <Typography sx={{ color: '#64748B', mt: 2, textAlign: 'center', }}>
                No virtual cards provided
              </Typography>
            )}
      </Box>
    </Box>
  );
};

export default VirtualCardsCard;
