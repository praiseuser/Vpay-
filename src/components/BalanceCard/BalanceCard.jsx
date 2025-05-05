import React from "react";
import { Box, Card, Typography, Button, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BalanceCard = ({ cardShadow }) => (
  <Card
    sx={{
      height: 286,
      width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
      borderRadius: "16px",
      p: { xs: 1, sm: 2, md: 3 },
      boxShadow: cardShadow,
    }}
  >
    <Typography sx={{ color: "#646464", fontFamily: "Mada, sans-serif", fontSize: { xs: 14, sm: 16 } }}>
      Good morning
    </Typography>
    <Typography
      sx={{
        fontWeight: 500,
        color: "#0C0B18",
        fontSize: { xs: 14, sm: 16 },
        fontFamily: "Mada, sans-serif",
      }}
    >
      Gracetrans
    </Typography>
    <Divider sx={{ my: { xs: 1, sm: 2 }, borderColor: "#D9D9D9" }} />
    <Typography sx={{ color: "#646464", fontSize: { xs: 14, sm: 16 } }}>Balance</Typography>
    <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 }, color: "#0C0B18" }}>
      $23,365.00
    </Typography>
    <Button
      variant="contained"
      fullWidth
      sx={{
        mt: "50px",
        height: 42,
        borderRadius: 2,
        backgroundColor: "#377DFF",
        textTransform: "none",
      }}
    >
      <ArrowForwardIcon sx={{ color: "#fff", mr: 1 }} />
      Transfer
    </Button>
  </Card>
);

export default BalanceCard;