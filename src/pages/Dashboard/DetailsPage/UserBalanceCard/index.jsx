import { Box, Typography, Button } from "@mui/material";

export default function UserBalanceCard({ user }) {
  const cryptos = user.cryptos || [];

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={leftTextStyle}>User Balance</Typography>
      </Box>

      <Box display="flex" gap={2}>
        <Box sx={balanceCardStyle}>
          <Typography>Total Balance</Typography>
          <Typography>${user.total_balance || "0.00"}</Typography>
          <Button>View All</Button>
        </Box>

        {cryptos.map((crypto, idx) => (
          <Box key={idx} sx={cryptoCardStyle}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src={crypto.img} width={32} height={32} />
              <Box>
                <Typography>{crypto.label}</Typography>
                <Typography>{crypto.percent_change || "+0%"}</Typography>
              </Box>
            </Box>
            <Typography>{crypto.balance}</Typography>
            <Typography>({crypto.value})</Typography>
            <Button>View All</Button>
          </Box>
        ))}
      </Box>
    </>
  );
}

const leftTextStyle = { fontFamily: "Inter", fontWeight: 600, fontSize: 18 };
const balanceCardStyle = { padding: 2, border: "1px solid #EBF1F4", borderRadius: 2, flex: 1 };
const cryptoCardStyle = { padding: 2, border: "1px solid #EBF1F4", borderRadius: 2, flex: 1 };
