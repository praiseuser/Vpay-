import { Box, Typography, Button } from "@mui/material";

export default function UserSummaryCard({ user }) {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={leftTextStyle}>User - {user.firstname} {user.lastname}</Typography>
        <Typography sx={rightTextStyle}>View All</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box sx={{ ...boxBaseStyle, backgroundColor: '#BCFFD6' }}>
          <Typography sx={titleText}>Total Income</Typography>
          <Typography sx={amountText}>${user.total_income || "0.00"}</Typography>
          <Button sx={{ ...buttonStyle, backgroundColor: '#2FC269' }}>View All</Button>
        </Box>

        <Box sx={{ ...boxBaseStyle, backgroundColor: '#F1B3BA' }}>
          <Typography sx={titleText}>Total Payouts</Typography>
          <Typography sx={amountText}>${user.total_payouts || "0.00"}</Typography>
          <Button sx={{ ...buttonStyle, backgroundColor: '#E43F51' }}>View All</Button>
        </Box>
      </Box>
    </>
  );
}

const leftTextStyle = { fontFamily: "Inter", fontWeight: 600, fontSize: 18 };
const rightTextStyle = { fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: "#009512" };
const boxBaseStyle = { width: 200, padding: 2, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center" };
const titleText = { fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: "#000" };
const amountText = { fontFamily: "Inter", fontWeight: 700, fontSize: 18, color: "#000" };
const buttonStyle = { marginTop: 1, fontSize: 12, color: "#fff", textTransform: "none" };
