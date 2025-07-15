import React from "react";
import { Card, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { styles } from "./PerformanceCardStyles";

const PerformanceCard = ({ barData, cardShadow }) => {
  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow }}>
      <Typography sx={styles.title}>Performance</Typography>
      <Box sx={styles.chartBar} />
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: -10, bottom: 50 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#26A69A" />
              <stop offset="100%" stopColor="#4DD0E1" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: { xs: 10, sm: 12 }, fill: "#646464", fontFamily: 'Mada, sans-serif' }}
          />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 10000]}
            tick={{ fontSize: { xs: 10, sm: 12 }, fill: "#646464", fontFamily: 'Mada, sans-serif' }}
          />
          <Bar
            dataKey="primary"
            fill="url(#gradient)"
            barSize={15}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <Box sx={styles.cryptoContainer}>
        <Box sx={styles.cryptoColumn}>
          <Box sx={styles.cryptoItem}>
            <Box sx={styles.cryptoAvatar} />
            <Box>
              <Typography sx={styles.cryptoName}>Bitcoin</Typography>
              <Typography sx={styles.cryptoPrice}>$43,489.57</Typography>
            </Box>
            <Typography sx={styles.cryptoChange}>-0.04%</Typography>
            <Typography sx={styles.cryptoAmount}>0.3 BTC</Typography>
          </Box>
          <Box sx={styles.cryptoItem}>
            <Box sx={styles.cryptoAvatar} />
            <Box>
              <Typography sx={styles.cryptoName}>BNB</Typography>
              <Typography sx={styles.cryptoPrice}>$430.11</Typography>
            </Box>
            <Typography sx={styles.cryptoChange}>-2.44%</Typography>
            <Typography sx={styles.cryptoAmount}>0 BNB</Typography>
          </Box>
        </Box>
        <Box sx={styles.cryptoColumn}>
          <Box sx={styles.cryptoItem}>
            <Box sx={styles.cryptoAvatar} />
            <Box>
              <Typography sx={styles.cryptoName}>Smart Chain</Typography>
              <Typography sx={styles.cryptoPrice}>$430.11</Typography>
            </Box>
            <Typography sx={{ ...styles.cryptoChange, color: "#E7854D", ml: -2.5, mt: 2.7 }}>
              -2.44%
            </Typography>
            <Typography sx={styles.cryptoAmount}>0 BNB</Typography>
          </Box>
          <Box sx={styles.cryptoItem}>
            <Box sx={styles.cryptoAvatar} />
            <Box>
              <Typography sx={styles.cryptoName}>BUSD</Typography>
              <Typography sx={styles.cryptoPrice}>$56.43</Typography>
            </Box>
            <Typography sx={{ ...styles.cryptoChange, ml: 1, mt: 2.7 }}>
              -0.24%
            </Typography>
            <Typography sx={styles.cryptoAmount}>0 BUSD</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PerformanceCard;