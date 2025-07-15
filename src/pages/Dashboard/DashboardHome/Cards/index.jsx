import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import React from 'react';
import * as styles from './styles';

const cardData = [
  {
    title: 'Transactions',
    value: '1,234',
    chartData: [
      { name: 'Completed', value: 800 },
      { name: 'Pending', value: 300 },
      { name: 'Failed', value: 134 },
    ],
    colors: ['#26A69A', '#4DD0E1', '#80DEEA', '#B2EBF2'],
    percentage: Math.round((800 / 1234) * 100),
    growthValue: '+32.40%',
  },
  {
    title: 'Users',
    value: '567',
    chartData: [
      { name: 'Active', value: 400 },
      { name: 'Inactive', value: 167 },
    ],
    colors: ['#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5'],
    percentage: Math.round((400 / 567) * 100),
    growthValue: '+15.75%',
  },
  {
    title: 'Activities',
    value: '1,746',
    chartData: [
      { name: 'Savings', value: 3000000 },
      { name: 'Checking', value: 1500000 },
      { name: 'Investment', value: 700000 },
    ],
    colors: ['#66BB6A', '#D4E157', '#FFCA28', '#FFA726'],
    percentage: Math.round((3000000 / 5200000) * 100),
    growthValue: '+25.60%',
  },
  {
    title: 'Fraud Alerts',
    value: '245',
    chartData: [
      { name: 'Suspicious Transactions', value: 150 },
      { name: 'Account Takeover', value: 70 },
      { name: 'Identity Theft', value: 25 },
    ],
    colors: ['#E57373', '#EF5350', '#D32F2F', '#B71C1C'],
    percentage: Math.round((150 / 245) * 100),
    growthValue: '+8.90%',
  },
];

const Cards = ({ cardShadow }) => {
  return (
    <Box sx={styles.container}>
      {cardData.map((card, index) => (
        <Box
          key={index}
          sx={{
            ...styles.card,
            boxShadow: cardShadow || styles.card.boxShadow,
          }}
        >
          <Box sx={styles.textContainer}>
            <Typography sx={styles.title}>{card.title}</Typography>
            <Typography sx={styles.value}>{card.value}</Typography>
            <Typography sx={styles.growth}>
              {card.growthValue}{' '}
              <span style={{color: 'black', fontWeight: '500', fontFamily: 'Mada, san-serif', marginRight: '6px' }}>last month</span>
            </Typography>
          </Box>
          <Box sx={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={card.chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={28}
                  innerRadius={20}
                  fill="#8884d8"
                  stroke="#FFFFFF"
                  strokeWidth={1}
                >
                  {card.chartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={card.colors[i % card.colors.length]} />
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
                  {card.percentage}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Cards;