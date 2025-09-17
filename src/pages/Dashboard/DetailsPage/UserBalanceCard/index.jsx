import { Box, Typography, Button } from "@mui/material";
import {
  secondCardBoxContainer,
  secondCardBoxStyle,
  secondCardBoxText,
  secondCardBoxAmount,
  secondCardBoxButton,
  secondCardButtonText,
  fourthCardBoxStyle,
  usdtCardContent,
  usdtTopRow,
  usdtLabel,
  usdtPercent,
  usdtBalance,
  usdtDollar,
  usdtButton,
  leftTextStyle,
  cardStyle, // Make sure to import cardStyle
} from "../userStyles";

export default function UserBalanceCard() {
  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography sx={leftTextStyle}>User Balance - Advantek</Typography>
        </Box>

        <Box sx={secondCardBoxContainer}>
          <Box sx={secondCardBoxStyle}>
            <Typography sx={secondCardBoxText}>Total Balance</Typography>
            <Typography sx={secondCardBoxAmount}>$9,510.32</Typography>
            <Box sx={secondCardBoxButton}>
              <Typography sx={secondCardButtonText}>Total cumulative balance</Typography>
            </Box>
          </Box>

          {[{ label: "USDT", img: "/Group.png", balance: "900.32 usdt", value: "$148.76" },
          { label: "Bitcoin", img: "/Group1.png", balance: "0.017902 btc", value: "$148.76" }]
            .map((crypto, idx) => (
              <Box key={idx} sx={fourthCardBoxStyle}>
                <Box sx={usdtCardContent}>
                  <Box sx={usdtTopRow}>
                    <img src={crypto.img} width={32} height={32} style={{ marginLeft: "20px", marginTop: "7px" }} />
                    <Box ml={1}>
                      <Typography sx={usdtLabel}>{crypto.label}</Typography>
                      <Typography sx={usdtPercent}>+0.025%</Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography sx={usdtBalance}>{crypto.balance}</Typography>
                    <Typography sx={usdtDollar}>({crypto.value})</Typography>
                  </Box>
                  <Button sx={usdtButton}>
                    <Typography
                      sx={{
                        fontSize: "9px",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        lineHeight: "0px",
                        color: "#000000",
                      }}
                    >
                      View All
                    </Typography>
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
    </>
  );
}
