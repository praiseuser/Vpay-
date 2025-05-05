import React, { useState } from "react";
import { Card, Typography, Box, Select, MenuItem } from "@mui/material";
import { styles } from "./AnalyticsCardStyles";

const AnalyticsCard = ({
  title,
  amount,
  percentage,
  percentageColor,
  note,
  cardShadow,
  sx,
}) => {
  const [period, setPeriod] = useState("Monthly");

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow, ...sx }}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>{title}</Typography>
        <Select
          value={period}
          onChange={handlePeriodChange}
          sx={styles.periodSelect}
          displayEmpty
        >
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </Box>
      <Box sx={styles.amountContainer}>
        <Typography sx={styles.amount}>{amount}</Typography>
        <Box sx={{ ...styles.percentageBox, backgroundColor: percentageColor }}>
          <Typography sx={styles.percentage}>{percentage}</Typography>
        </Box>
      </Box>
      <Typography sx={styles.note}>{note}</Typography>
    </Card>
  );
};

export default AnalyticsCard;