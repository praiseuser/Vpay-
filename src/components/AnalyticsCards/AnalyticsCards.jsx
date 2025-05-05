import React from "react";
import { Card, Typography } from "@mui/material";

const AnalyticsCards = ({ cardShadow }) => (
  <>
    <Card
      sx={{
        height: 131,
        width: { xs: "100%", sm: "100%", md: "100%", lg: "200%" }, // 200% on large screens
        maxWidth: { lg: 500 },
        borderRadius: "16px",
        p: { xs: 0.5, sm: 2 },
        boxShadow: cardShadow,
        mx: "auto",
        transform: { lg: "translateX(-25%)" }, // Adjusted positioning
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: { xs: 14, sm: 16 } }}>Income Analytics</Typography>
    </Card>
    <Card
      sx={{
        height: 131,
        width: { xs: "100%", sm: "100%", md: "100%", lg: "200%" }, // 200% on large screens
        maxWidth: { lg: 500 },
        borderRadius: "16px",
        mt: 2,
        p: { xs: 0.5, sm: 2 },
        boxShadow: cardShadow,
        mx: "auto",
        transform: { lg: "translateX(-25%)" },
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: { xs: 14, sm: 16 } }}>Expense Analytics</Typography>
    </Card>
  </>
);

export default AnalyticsCards;