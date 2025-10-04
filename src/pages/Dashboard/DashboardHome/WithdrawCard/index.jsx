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
        <React.Fragment key={index}>
          <Box sx={styles.item}>
            <Box sx={styles.avatar}>
              <Typography sx={styles.avatarText}>
                {item.name?.charAt(0).toUpperCase()}
              </Typography>
            </Box>

            <Box sx={styles.itemDetails}>
              <Typography sx={styles.itemName}>{item.name}</Typography>
              <Typography sx={styles.itemDate}>{item.date || "12/03/2024"}</Typography>
            </Box>

            <Typography
              sx={{
                ...styles.itemAmount,
                color: item.type === "income" ? "#4CAF50" : "#E53935",
              }}
            >
              {item.amount}
            </Typography>
          </Box>

          {index < visibleItems.length - 1 && (
            <Box sx={styles.divider}></Box>
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default WithdrawCard;
