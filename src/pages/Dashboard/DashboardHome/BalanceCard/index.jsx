import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


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
              outerRadius={70}
              innerRadius={50}
              fill="#8884d8" a
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

export const styles = {
  card: {
    height: { xs: 250, sm: 280 },
    borderRadius: '16px',
    p: { xs: 2, sm: 3 },
    marginLeft: { xs: 0, sm: '4px' },
    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
  },
  withdrawerText: {
    fontFamily: 'Mada, sans-serif',
    fontSize: { xs: 18, sm: 14 },
    fontWeight: 500,
    color: '#0C0B18',
    alignSelf: 'flex-start',
    mb: 2,
  },
  chartContainer: {
    width: { xs: '180px', sm: '220px' },
    height: { xs: '180px', sm: '220px' },
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};