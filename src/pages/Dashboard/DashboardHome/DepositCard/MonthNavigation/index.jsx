import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const MonthNavigation = ({ currentMonth, handlePrevMonth, handleNextMonth, styles }) => {
  return (
    <Box sx={styles.monthNav}>
      <Box sx={styles.navItem} onClick={handlePrevMonth}>
        <KeyboardBackspaceIcon sx={styles.navIcon} />
        <Typography sx={styles.navText}>Jul</Typography>
      </Box>
      <Typography sx={styles.currentMonth}>{currentMonth}</Typography>
      <Box sx={styles.navItem} onClick={handleNextMonth}>
        <Typography sx={styles.navText}>Sep</Typography>
        <ArrowRightAltIcon sx={styles.navIcon} />
      </Box>
    </Box>
  );
};

export default MonthNavigation;
