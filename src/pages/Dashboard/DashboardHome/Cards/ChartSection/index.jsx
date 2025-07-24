import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Box } from "@mui/material";

const ChartSection = ({ chartData, colors, percentage }) => {
  return (
    <Box sx={{ width: "100%", height: 80, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={28}
            innerRadius={20}
            fill="#8884d8"
            stroke="#FFFFFF"
            strokeWidth={1}
          >
            {chartData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            dy={4}
            textAnchor="middle"
            fill="#1F2937"
            fontFamily="Mada, sans-serif"
            fontSize="10px"
            fontWeight="600"
          >
            {percentage}%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartSection;