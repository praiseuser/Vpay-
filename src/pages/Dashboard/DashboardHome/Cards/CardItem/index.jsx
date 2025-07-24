import React from "react";
import { Box, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import ChartSection from '../ChartSection';
import * as styles from '../styles';

const CardItem = ({ card, cardShadow }) => {
    const getIcon = () => {
        switch (card.icon) {
            case "SwapHorizIcon":
                return <SwapHorizIcon sx={{ fontSize: 16, color: "#26A69A" }} />;
            case "PeopleIcon":
                return <PeopleIcon sx={{ fontSize: 16, color: "#AB47BC" }} />;
            case "TrendingUpIcon":
                return <TrendingUpIcon sx={{ fontSize: 16, color: "#66BB6A" }} />;
            case "WarningIcon":
                return <WarningIcon sx={{ fontSize: 16, color: "#E57373" }} />;
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                ...styles.card,
                boxShadow: cardShadow || styles.card.boxShadow,
            }}
        >
            <Box sx={styles.textContainer}>
                {getIcon()}
                <Typography sx={styles.title}>{card.title}</Typography>
                <Typography sx={styles.value}>{card.value}</Typography>
                <Typography sx={styles.growth}>
                    {card.growthValue}{" "}
                    <span style={{ color: "black", fontWeight: "500", fontFamily: "Mada, sans-serif", marginRight: "6px" }}>
                        last month
                    </span>
                </Typography>
            </Box>
            <ChartSection chartData={card.chartData} colors={card.colors} percentage={card.percentage} />
        </Box>
    );
};

export default CardItem;