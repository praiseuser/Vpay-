import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

const FiatDetail = ({ asset }) => {
  const formattedValue = (val) =>
    typeof val === "number" || !isNaN(val)
      ? Number(val).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : val;

  return (
    <Box sx={{ mt: 2 }}>


      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          background: "white",
          mb: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #f1f5f9, #fafafa)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
         
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "0.5px",
            }}
          >
            {asset.fiat_currency_name} Details
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {Object.keys(asset).map((key, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2.2,
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  background: "#fafafa",
                  transition: "0.25s",
                  "&:hover": {
                    background: "#f1f5f9",
                    borderColor: "#cbd5e1",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {key.replace(/_/g, " ")}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#0F172A",
                    mt: 0.8,
                  }}
                >
                  {formattedValue(asset[key])}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #f1f5f9, #fafafa)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <HistoryIcon sx={{ color: "#0F172A" }} />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            Transaction History
          </Typography>
        </Box>

        <Box
          sx={{
            minHeight: "150px",
            borderRadius: "12px",
            border: "1px dashed #cbd5e1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#64748B",
            fontSize: "15px",
            background: "#fafafa",
          }}
        >
          Transaction history will appear here once the API is integrated.
        </Box>
      </Paper>
    </Box>
  );
};

export default FiatDetail;
