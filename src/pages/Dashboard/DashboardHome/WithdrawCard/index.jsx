import React, { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { styles, getMinCardHeight } from "./WithdrawCardStyles";

const WithdrawCard = ({ withdrawals, cardShadow }) => {
  const [showAll, setShowAll] = useState(true);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const visibleItems = showAll ? withdrawals : [];

  return (
    <Card
      sx={{
        ...styles.card,
        boxShadow: cardShadow,
        minHeight: `${getMinCardHeight(visibleItems.length)}px`,
      }}
    >
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Withdrawer</Typography>
        <Typography sx={styles.toggle} onClick={handleToggle}>
          {showAll ? "View Less" : "View All"}
        </Typography>
      </Box>

      {visibleItems.map((item, index) => (
        <Box key={index} sx={styles.item}>
          <Box sx={styles.avatar} />
          <Box sx={styles.itemDetails}>
            <Typography sx={styles.itemName}>{item.name}</Typography>
            <Typography sx={styles.itemDate}>12/03/2024</Typography>
          </Box>
          <Typography sx={{ ...styles.itemAmount, color: item.color }}>
            {item.amount}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

export default WithdrawCard;
