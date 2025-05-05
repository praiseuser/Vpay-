import React from "react";
import { Box, Button, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const buttonStyles = {
  base: {
    height: "40px",
    borderRadius: "10px",
    fontFamily: "Inter",
    fontSize: "12px",
    textTransform: "capitalize",
  },
};

const ActionButtons = ({ showAddButton, showFilterButton }) => (
  <Box sx={{ display: "flex", gap: "8px" }}>
    {showAddButton && (
      <Button
        variant="contained"
        sx={{
          ...buttonStyles.base,
          width: "119px",
          bgcolor: "#208BC9",
          fontWeight: 700,
          fontSize: "10px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          lineHeight: "100px",
          "&:hover": { bgcolor: "#1AADE0" },
        }}
      >
        Add Crypto
        <Typography
          component="span"
          sx={{
            fontFamily: "Open Sans",
            fontWeight: 800,
            fontSize: "22px",
            lineHeight: "54px",
            color: "#fff",
          }}
        >
          +
        </Typography>
      </Button>
    )}

    {showFilterButton && (
      <Button
        variant="outlined"
        startIcon={<FilterListIcon sx={{ fontSize: "16px", color: "#4A4A4A" }} />}
        sx={{
          ...buttonStyles.base,
          width: "108px",
          border: "1px solid #AAAAAA",
          fontWeight: 400,
          color: "#4A4A4A",
        }}
      >
        Filters
      </Button>
    )}
  </Box>
);

export default ActionButtons;