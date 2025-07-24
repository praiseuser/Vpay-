import React from "react";
import { Box } from "@mui/material";
import CardItem from '../Cards/CardItem';
import * as styles from "./styles";

const cardData = [
  {
    title: "Transactions",
    value: "1,234",
    chartData: [
      { name: "Completed", value: 800 },
      { name: "Pending", value: 300 },
      { name: "Failed", value: 134 },
    ],
    colors: ["#26A69A", "#4DD0E1", "#80DEEA", "#B2EBF2"],
    percentage: Math.round((800 / 1234) * 100),
    growthValue: "+32.40%",
    icon: "SwapHorizIcon",
  },
  {
    title: "Users",
    value: "567",
    chartData: [
      { name: "Active", value: 400 },
      { name: "Inactive", value: 167 },
    ],
    colors: ["#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5"],
    percentage: Math.round((400 / 567) * 100),
    growthValue: "+15.75%",
    icon: "PeopleIcon",
  },
  {
    title: "Activities",
    value: "1,746",
    chartData: [
      { name: "Savings", value: 3000000 },
      { name: "Checking", value: 1500000 },
      { name: "Investment", value: 700000 },
    ],
    colors: ["#66BB6A", "#D4E157", "#FFCA28", "#FFA726"],
    percentage: Math.round((3000000 / 5200000) * 100),
    growthValue: "+25.60%",
    icon: "TrendingUpIcon",
  },
  {
    title: "Fraud Alerts",
    value: "245",
    chartData: [
      { name: "Suspicious Transactions", value: 150 },
      { name: "Account Takeover", value: 70 },
      { name: "Identity Theft", value: 25 },
    ],
    colors: ["#E57373", "#EF5350", "#D32F2F", "#B71C1C"],
    percentage: Math.round((150 / 245) * 100),
    growthValue: "+8.90%",
    icon: "WarningIcon",
  },
];

const Cards = ({ cardShadow }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "16px",
        borderRadius: "16px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={styles.container}>
        {cardData.map((card, index) => (
          <CardItem key={index} card={card} cardShadow={cardShadow} />
        ))}
      </Box>
    </Box>
  );
};

export default Cards;