import React from "react";
import { Card, Typography, Box, Avatar, Divider } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { styles } from "./PerformanceCardStyles";

const PerformanceCard = ({ barData, cardShadow }) => {
  return (
    <Card sx={{ ...styles.card, boxShadow: cardShadow }}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Performance</Typography>
        <Box sx={styles.accent} />
      </Box>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={barData}
          margin={{ top: 20, right: 30, left: -10, bottom: 30 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#26A69A" />
              <stop offset="100%" stopColor="#4DD0E1" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#646464", fontFamily: "Mada, sans-serif" }}
          />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 10000]}
            tick={{ fontSize: 12, fill: "#646464", fontFamily: "Mada, sans-serif" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Bar
            dataKey="primary"
            fill="url(#gradient)"
            barSize={18}
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>

      <Box sx={styles.cryptoContainer}>
        {[
          {
            name: "Bitcoin",
            price: "$43,489.57",
            change: "-0.04%",
            amount: "0.3 BTC",
            avatar: "/bitcoin.jpeg",
            changeColor: "#E57373",
          },
          {
            name: "BNB",
            price: "$430.11",
            change: "-2.44%",
            amount: "0 BNB",
            avatar: "/BNB.webp",
            changeColor: "#E57373",
          },
          {
            name: "Smart Chain",
            price: "$430.11",
            change: "+1.20%",
            amount: "0 BNB",
            avatar: "/chain.png",
            changeColor: "#4CAF50",
          },
          {
            name: "BUSD",
            price: "$56.43",
            change: "+0.24%",
            amount: "0 BUSD",
            avatar: "/buu.jpeg",
            changeColor: "#4CAF50",
          },
        ].map((crypto, index) => (
          <React.Fragment key={index}>
            <Box sx={styles.cryptoItem}>
              <Avatar src={crypto.avatar} alt={crypto.name} sx={styles.cryptoAvatar} />
              <Box sx={{ flex: 1, ml: 1 }}>
                <Typography sx={styles.cryptoName}>{crypto.name}</Typography>
                <Typography sx={styles.cryptoPrice}>{crypto.price}</Typography>
              </Box>
              <Typography sx={{ ...styles.cryptoChange, color: crypto.changeColor }}>
                {crypto.change}
              </Typography>
              <Typography sx={styles.cryptoAmount}>{crypto.amount}</Typography>
            </Box>
            {index < 3 && <Divider sx={styles.divider} />}
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default PerformanceCard;
