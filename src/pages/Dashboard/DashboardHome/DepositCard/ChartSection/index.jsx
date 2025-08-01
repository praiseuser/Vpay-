import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

const ChartSection = ({ pieData, styles }) => {
  const COLORS = ['#26A69A', '#4DD0E1', '#80DEEA'];

  return (
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
  );
};

export default ChartSection;