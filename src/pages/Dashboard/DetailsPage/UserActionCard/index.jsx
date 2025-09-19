import { Box, Button } from "@mui/material";

export default function UserActionCard({ user }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="outlined" sx={emailButtonStyle} onClick={() => console.log("Send email to", user.email)}>
        Send E-mail
      </Button>

      <Button variant="outlined" sx={flagButtonStyle} onClick={() => console.log("Flag user", user.id)}>
        Flag User
      </Button>
    </Box>
  );
}

const emailButtonStyle = {
  width: 116,
  height: 36,
  borderRadius: 6,
  backgroundColor: "#CDFFD3",
  borderColor: "#009512",
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 12,
  color: "#009512",
  textTransform: "none",
};

const flagButtonStyle = {
  width: 94,
  height: 36,
  borderRadius: 6,
  backgroundColor: "#FFC0C0",
  borderColor: "#FF0303",
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 12,
  color: "#FF0303",
  textTransform: "none",
};
