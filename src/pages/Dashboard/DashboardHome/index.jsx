import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import BalanceCard from "../DashboardHome/BalanceCard";
import AnalyticsCard from "../DashboardHome/AnalyticsCard";
import PerformanceCard from "../DashboardHome/PerformanceCard";
import WithdrawCard from "../DashboardHome/WithdrawCard";
import DepositCard from "../DashboardHome/DepositCard";
import Cards from "../DashboardHome/Cards";

const theme = createTheme({
  typography: {
    fontFamily: "'Mada', sans-serif",
  },
});

const DashboardHome = () => {
  const pieData = [
    { name: "Staked", value: 400, fill: "#377DFF" },
    { name: "Remaining", value: 300, fill: "#E7854D" },
    { name: "Unstaked", value: 300, fill: "#D9D9D9" },
  ];

  const withdrawals = [
    { name: "Jenny Wilson", amount: "+$265.00", color: "#02042D" },
    { name: "Darlene Robertson", amount: "+$365.22", color: "#02042D" },
    { name: "William", amount: "+$125.14", color: "#377DFF" },
    { name: "Guy Hawkins", amount: "+$254.00", color: "#02042D" },
    { name: "Grace Jim", amount: "+$412.00", color: "#377DFF" },
    { name: "Jane Cooper", amount: "+$127.00", color: "#02042D" },
  ];

  const barData = [
    { name: "Jan", primary: 4000 },
    { name: "Feb", primary: 3000 },
    { name: "Mar", primary: 5000 },
    { name: "Apr", primary: 6000 },
    { name: "May", primary: 7000 },
    { name: "Jun", primary: 8000 },
    { name: "Jul", primary: 9000 },
    { name: "Aug", primary: 1000 },
  ];

  const cardShadow = "0px 8px 24px rgba(0, 0, 0, 0.15)";

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: '1.5px', marginTop: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Cards cardShadow={cardShadow} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <BalanceCard cardShadow={cardShadow} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <AnalyticsCard
                  title="Income Analytics"
                  amount="₦3,236,325"
                  percentage="+3.3%"
                  percentageColor="rgba(55, 125, 255, 0.5)"
                  note="Expense increased by $2.125 this month"
                  cardShadow={cardShadow}
                />
                <AnalyticsCard
                  title="Expense Analytics"
                  amount="₦2,658,255"
                  percentage="-2.3%"
                  percentageColor="rgba(231, 133, 77, 0.5)"
                  note="Expense increased by $2.125 this month"
                  cardShadow={cardShadow}
                  sx={{ mt: 2.1 }}
                />
              </Grid>
            </Grid>
            <PerformanceCard barData={barData} cardShadow={cardShadow} />
          </Grid>
          <Grid item xs={12} md={4}>
            <WithdrawCard withdrawals={withdrawals} cardShadow={cardShadow} />
            <DepositCard pieData={pieData} cardShadow={cardShadow} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardHome;