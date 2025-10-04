import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import ChartSection from "../DepositCard/ChartSection";
import MonthNavigation from "../DepositCard/MonthNavigation";
import { styles } from "./DepositCardStyles";

const DepositCard = ({ pieData, cardShadow }) => {
  const [showAll, setShowAll] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("August");

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const months = ["July", "August", "September"];
  const handlePrevMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    const prevIndex = (currentIndex - 1 + months.length) % months.length;
    setCurrentMonth(months[prevIndex]);
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    const nextIndex = (currentIndex + 1) % months.length;
    setCurrentMonth(months[nextIndex]);
  };

  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow }}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Deposit</Typography>
        <Typography sx={styles.toggle} onClick={handleToggle}>
          {showAll ? "View Less" : "View All"}
        </Typography>
      </Box>
      {showAll && (
        <>
          <ChartSection pieData={pieData} styles={styles} />
          <MonthNavigation
            currentMonth={currentMonth}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            styles={styles}
          />
        </>
      )}
    </Card>
  );
};

export default DepositCard;
