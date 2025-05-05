import { Box, Button } from "@mui/material";

export default function UserActionCard() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="outlined"
        sx={{
          width: "116px",
          height: "36px",
          borderRadius: "6px",
          borderWidth: "1px",
          backgroundColor: "#CDFFD3",
          borderColor: "#009512",
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.3%",
          color: "#009512",
          textTransform: "none",
        }}
      >
        Send E-mail
      </Button>
      <Button
        variant="outlined"
        sx={{
          width: "94px",
          height: "36px",
          borderRadius: "6px",
          borderWidth: "1px",
          backgroundColor: "#FFC0C0",
          borderColor: "#FF0303",
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "0.3%",
          color: "#FF0303",
          textTransform: "none",
        }}
      >
        Flag User
      </Button>
    </Box>
  );
}
