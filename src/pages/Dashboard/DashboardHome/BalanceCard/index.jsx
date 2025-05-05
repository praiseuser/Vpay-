import React from "react";
import { Card, Typography, Button, Divider, Box } from "@mui/material";
import { styles } from "./BalanceCardStyles";

const BalanceCard = ({ cardShadow }) => {
  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow }}>
      <Box sx={styles.greetingContainer}>
        <Typography sx={styles.greeting}>Good morning</Typography>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
      </Box>
      <Typography sx={styles.name}>Gracetrans</Typography>
      <Divider sx={styles.divider} />
      <Typography sx={styles.balanceLabel}>Balance</Typography>
      <Typography sx={styles.balanceAmount}>$23,365.00</Typography>
      <Button variant="contained" fullWidth sx={styles.button}>
        <img src="/Vector.png" alt="Vector icon" width={21.57} height={17.5} />
        <Typography sx={styles.buttonText}>Transfer</Typography>
      </Button>
    </Card>
  );
};

export default BalanceCard;