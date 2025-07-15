import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { styles } from './BalanceCardStyles';

const withdrawalData = [
  { name: 'Savings', value: 5000 },
  { name: 'Investments', value: 3000 },
  { name: 'Checking', value: 2000 },
];
const colors = ['#26A69A', '#4DD0E1', '#80DEEA'];
const total = withdrawalData.reduce((sum, item) => sum + item.value, 0);
const percentage = Math.round((withdrawalData[0].value / total) * 100);

const BalanceCard = ({ cardShadow }) => {
  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow }}>
      <Typography sx={styles.withdrawerText}>Withdrawer</Typography>
      <Box sx={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={withdrawalData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={40}
              fill="#8884d8"
              stroke="#FFFFFF"
              strokeWidth={1}
            >
              {withdrawalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              dy={4}
              textAnchor="middle"
              fill="#0C0B18"
              fontFamily="Mada, sans-serif"
              fontSize="12px"
              fontWeight="600"
            >
              {percentage}%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default BalanceCard;