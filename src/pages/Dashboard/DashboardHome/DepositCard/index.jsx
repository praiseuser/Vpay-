import React, { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { styles } from "./DepositCardStyles";

const COLORS = ['#26A69A', '#4DD0E1', '#80DEEA'];

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
          <Box sx={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={50}
                  stroke="#FFFFFF"
                  strokeWidth={1}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box sx={styles.chartLabel}>
              <Typography sx={{ ...styles.labelText, fontFamily: 'Mada, sans-serif' }}>Staked</Typography>
              <Typography sx={{ ...styles.labelAmount, fontFamily: 'Mada, sans-serif' }}>$1,000,000</Typography>
            </Box>
          </Box>
          <Box sx={styles.monthNav}>
            <Box sx={styles.navItem}>
              <KeyboardBackspaceIcon sx={styles.navIcon} onClick={handlePrevMonth} />
              <Typography sx={{ ...styles.navText, fontFamily: 'Mada, sans-serif' }}>Jul</Typography>
            </Box>
            <Typography sx={{ ...styles.currentMonth, fontFamily: 'Mada, sans-serif' }}>{currentMonth}</Typography>
            <Box sx={styles.navItem}>
              <Typography sx={{ ...styles.navText, fontFamily: 'Mada, sans-serif' }}>Sep</Typography>
              <ArrowRightAltIcon sx={styles.navIcon} onClick={handleNextMonth} />
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default DepositCard;