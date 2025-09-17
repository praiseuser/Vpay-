import { Box, Typography, Button } from "@mui/material";
import {
  cardStyle,
  leftTextStyle,
  rightTextStyle,
  boxBaseStyle,
  titleText,
  amountText,
  buttonStyle,
} from "../userStyles"

export default function UserSummaryCard() {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={leftTextStyle}>User - Advantek</Typography>
        <Typography sx={rightTextStyle}>View All</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box sx={{ ...boxBaseStyle, backgroundColor: '#BCFFD6' }}>
          <Typography sx={titleText}>Total Income</Typography>
          <Typography sx={amountText}>$92,300.00</Typography>
          <Button sx={{ ...buttonStyle, backgroundColor: '#2FC269' }}>View All</Button>
        </Box>

        <Box sx={{ ...boxBaseStyle, backgroundColor: '#F1B3BA' }}>
          <Typography sx={titleText}>Total Payouts</Typography>
          <Typography sx={amountText}>$50,952.20</Typography>
          <Button sx={{ ...buttonStyle, backgroundColor: '#E43F51' }}>View All</Button>
        </Box>
      </Box>
    </>
  );
}
